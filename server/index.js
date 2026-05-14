import express from "express";
import cors from "cors";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexnena-ai.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    status: "NexNena backend is running",
  });
});

/* =========================
   CREATE STUDENT
========================= */

app.post("/create-student", async (req, res) => {
  try {
    const {
      teacherId,
      studentName,
      email,
      password,
      topic,
      paymentStatus,
      amount,
      paymentMethod,
    } = req.body;

    if (!teacherId || !studentName || !email || !password || !topic) {
      return res.status(400).json({
        error:
          "Missing required fields. teacherId, studentName, email, password, and topic are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let userRecord;

    try {
      userRecord = await admin.auth().getUserByEmail(normalizedEmail);
    } catch {
      userRecord = await admin.auth().createUser({
        email: normalizedEmail,
        password,
        displayName: studentName,
      });

      await db.collection("users").doc(userRecord.uid).set({
        name: studentName,
        email: normalizedEmail,
        role: "student",
        teacherId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    const existingSubscriptionSnapshot = await db
      .collection("subscriptions")
      .where("teacherId", "==", teacherId)
      .where("email", "==", normalizedEmail)
      .where("topic", "==", topic)
      .get();

    if (!existingSubscriptionSnapshot.empty) {
      return res.status(409).json({
        error: "This student already has this topic under this teacher.",
      });
    }

    await db.collection("subscriptions").add({
      teacherId,
      studentId: userRecord.uid,
      studentName,
      email: normalizedEmail,
      topic,
      amount: Number(amount || 0),
      paymentStatus: paymentStatus || "unpaid",
      paymentMethod: paymentMethod || "cash",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("student_access").add({
      teacherId,
      studentId: userRecord.uid,
      studentName,
      email: normalizedEmail,
      topic,
      paymentStatus: paymentStatus || "unpaid",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({
      success: true,
      uid: userRecord.uid,
      message: "Student created successfully.",
    });
  } catch (error) {
    console.error("Create student error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NexNena server running on port ${PORT}`);
});
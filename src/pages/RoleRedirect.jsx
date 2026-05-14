import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function RoleRedirect() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Checking user role...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setMessage("User role not found. Please contact admin.");
          return;
        }

        const userData = userSnap.data();

        if (userData.role === "teacher") {
          navigate("/dashboard", { replace: true });
          return;
        }

        if (userData.role === "student") {
          navigate("/student-portal", { replace: true });
          return;
        }

        setMessage("Invalid user role. Please contact admin.");
      } catch (error) {
        console.error("Role redirect error:", error);
        setMessage("Unable to verify user role. Check Firestore rules.");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="authLoadingScreen">
      <div className="loader"></div>
      <h2>{message}</h2>
    </div>
  );
}

export default RoleRedirect;
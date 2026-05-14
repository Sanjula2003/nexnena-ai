import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function TeacherRoute({ children }) {
  const [allowed, setAllowed] = useState(undefined);

  useEffect(() => {
    async function checkTeacher() {
      const user = auth.currentUser;

      if (!user) {
        setAllowed(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setAllowed(false);
        return;
      }

      const role = userSnap.data().role;

      setAllowed(role === "teacher");
    }

    checkTeacher();
  }, []);

  if (allowed === undefined) {
    return (
      <div className="authLoadingScreen">
        <div className="loader"></div>
        <h2>Checking teacher access...</h2>
      </div>
    );
  }

  return allowed ? children : <Navigate to="/student-portal" replace />;
}

export default TeacherRoute;
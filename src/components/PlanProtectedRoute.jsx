import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

const planLevels = {
  basic: 1,
  standard: 2,
  pro: 3,
};

function PlanProtectedRoute({ children, requiredPlan = "basic" }) {
  const [allowed, setAllowed] = useState(undefined);

  useEffect(() => {
    async function checkPlan() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setAllowed(false);
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        const userPlan = userSnap.exists()
          ? userSnap.data().plan || "basic"
          : "basic";

        const currentLevel = planLevels[userPlan] || 1;
        const requiredLevel = planLevels[requiredPlan] || 1;

        setAllowed(currentLevel >= requiredLevel);
      } catch (error) {
        console.error("Plan check failed:", error);
        setAllowed(false);
      }
    }

    checkPlan();
  }, [requiredPlan]);

  if (allowed === undefined) {
    return (
      <div className="authLoadingScreen">
        <div className="loader"></div>
        <h2>Checking your plan...</h2>
      </div>
    );
  }

  return allowed ? children : <Navigate to="/upgrade" replace />;
}

export default PlanProtectedRoute;
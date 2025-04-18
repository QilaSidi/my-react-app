import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Start with null (undetermined)
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      // Introduce a small delay before checking sessionStorage
      await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay

      const storedRole = sessionStorage.getItem("role");
      console.log("PrivateRoute checking role (async). Expected:", role, "Stored:", storedRole);
      console.log("Full sessionStorage contents (async):", sessionStorage);
      console.log("PrivateRoute: Role retrieved from sessionStorage (async):", storedRole);

      setIsAuthorized(storedRole === role);
      setHasChecked(true);
    };

    checkAuthorization();
  }, [role]); // Re-check if the expected role changes

  if (!hasChecked) {
    return null; // Render nothing while checking
  }

  if (isAuthorized) {
    console.log("PrivateRoute (async): Access granted for role", role);
    return children();
  } else {
    console.log("PrivateRoute (async): Access denied. Redirecting to /student-login");
    return <Navigate to="/student-login" />;
  }
};

export default PrivateRoute;
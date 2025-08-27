import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const googleToken = credentialResponse.credential;
      console.log("Google Token:", googleToken);

      // 1. NEW: Send Google token to a dedicated backend endpoint for verification and JWT retrieval.
      const verificationResponse = await axios.post(
        "http://localhost:8082/api/auth/google-login", //  <----  NEW ENDPOINT
        { token: googleToken }
      );

      // Assuming the backend responds with { jwt, role, email } upon successful verification:
      const { jwt, role, email } = verificationResponse.data;

      console.log("JWT:", jwt);
      console.log("Role:", role);
      console.log("Email:", email);

      // 2. Save JWT and other user details in sessionStorage
      sessionStorage.setItem("token", jwt);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);

      // 3.  Role-based navigation
      if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else {
        setErrorMessage("Access denied: You are not a STUDENT.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypassLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // Send "email" and "role" to the EXISTING /api/auth/login - ensure backend handles this appropriately
      const response = await axios.post("http://localhost:8082/api/auth/login", {
        email: "student@students.kuptm.edu.my", // Or another appropriate test student email
        role: "STUDENT", // Set the role directly
      });

      const { jwt, role, email } = response.data;

      sessionStorage.setItem("token", jwt);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);

      // Check the role before navigating
      if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else {
        setErrorMessage("Bypass login returned non-STUDENT role.");  // Improved error message
      }
    } catch (error) {
      console.error("Bypass login error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "Bypass login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Student Login</h1>
      <p>Please log in using your KUPTM student email (e.g., yourname@student.kuptm.edu.my).</p>

      {isLoading && <p>Loading, please wait...</p>}

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.error("Google Login failed.");
          setErrorMessage("Google Login failed. Please try again or use bypass.");
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleBypassLogin}>Bypass Login for Demo</button>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default StudentLogin;
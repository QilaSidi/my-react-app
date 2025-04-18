import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CounselorLogin = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = useCallback(async (googleResponse) => {
        const token = googleResponse?.credential;
        
        if (!token) {
            console.error("Google login failed: Missing token");
            alert("Google login failed: No token received.");
            return;
        }

        console.log("Google Token:", token);

        try {
            const response = await fetch("http://localhost:8082/auth/google-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token }),
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }

            const data = await response.json();
            console.log("Login success:", data);

            if (data.role === "COUNSELOR") {
                localStorage.setItem("authToken", data.authToken); // Ensure correct token storage
                localStorage.setItem("userRole", data.role);
                alert(`Welcome, ${data.name}! Redirecting you...`);
                
                setTimeout(() => navigate("/counselor-dashboard"), 1000);
            } else {
                alert("Access Denied: You are not a counselor.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login failed: ${error.message}`);
        }
    }, [navigate]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: "97031596166-p0s80nr5ptse1sd49galglh2fnu1u8r8.apps.googleusercontent.com",
                callback: handleGoogleLogin,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-signin-button"),
                { theme: "outline", size: "large" }
            );
        };
    }, [handleGoogleLogin]);

    return (
        <div>
            <h2>Counselor Login</h2>
            <div id="google-signin-button"></div>
        </div>
    );
};

export default CounselorLogin;

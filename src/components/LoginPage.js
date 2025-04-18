import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const Login = () => {
    const [role, setRole] = useState(""); // Track role selection

    // Handle role selection
    const handleRoleChange = (e) => {
        setRole(e.target.value); // Update role based on selection
    };

    // Handle Google login success
    const handleLogin = (response) => {
        if (response.error) {
            console.log("Login failed: ", response.error);
            return;
        }

        const { tokenId } = response;

        // Send the token and role to the backend for verification
        fetch("http://localhost:8080/auth/google-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: tokenId,
                role: role, // Send the selected role
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Login successful: ", data);
                // Handle successful login, like redirecting or saving user info
            })
            .catch((err) => console.error("Error during login: ", err));
    };

    return (
        <div>
            <h2>Choose your role</h2>
            <select onChange={handleRoleChange} value={role}>
                <option value="">Select Role</option>
                <option value="STUDENT">Student</option>
                <option value="COUNSELOR">Counselor</option>
            </select>

            {role && (
                <GoogleLogin
                    clientId={
                        role === "STUDENT"
                            ? "681268107396-qvlmu3mlgsns92rle86mln83ng2fq9l6.apps.googleusercontent.com" // Replace with your student client ID
                            : "97031596166-p0s80nr5ptse1sd49galglh2fnu1u8r8.apps.googleusercontent.com" // Replace with your counselor client ID
                    }
                    buttonText="Login with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy="single_host_origin"
                />
            )}
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

const LoginPage = ({ setIsLoggedIn, setUserRole }) => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [userType, setUserType] = useState("citizen"); // Default user type
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const navigate = useNavigate();

  // Handles authentication for login and sign-up
  const handleAuth = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and role in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", userType);

        // Update global state
        setIsLoggedIn(true);
        setUserRole(userType);

        // Navigate to the respective dashboard
        const dashboardPaths = {
          citizen: "/citizen/dashboard",
          "law-enforcement": "/law-enforcement/dashboard",
          "municipal-authority": "/municipal-authorities/dashboard",
        };
        navigate(dashboardPaths[userType] || "/login");
      } else {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
      console.error("Error during login/signup:", error);
    }
  };

  // Toggles between login and sign-up mode
  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleAuth}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="citizen">Citizen</option>
            <option value="law-enforcement">Law Enforcement</option>
            <option value="municipal-authority">Municipal Authority</option>
          </select>
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={handleSignUpToggle} className="auth-toggle-button">
        {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
      </button>
    </div>
  );
};

export default LoginPage;

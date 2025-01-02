import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("citizen");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign up
  const navigate = useNavigate();

  // Handle Login/SignUp logic
  const handleAuth = async (e) => {
    e.preventDefault();

    // Choose the correct endpoint based on the isSignUp state
    const endpoint = isSignUp
      ? "http://localhost:5000/api/auth/signup"  // For sign up
      : "http://localhost:5000/api/auth/login";  // For login

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Successfully logged in or signed up
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", userType);

        // Redirect to the appropriate dashboard based on user type
        navigate(`/${userType}/dashboard`);
      } else {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
      console.error("Error during login/signup:", error);
    }
  };

  // Handle Sign Up Toggle
  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp); // Toggle between login and signup
    setErrorMessage(""); // Clear error message when toggling
    setEmail(""); // Clear email field when toggling
    setPassword(""); // Clear password field when toggling
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      {/* Error message display */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Login/Sign-Up Form */}
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

        {/* User Type Selection (only for Login and Sign-Up) */}
        {isSignUp && (
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
        )}

        {/* User Type Selection (only for Login) */}
        {!isSignUp && (
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
        )}

        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>

      {/* Switch between Login and Sign Up */}
      <div className="auth-links">
        <button onClick={handleSignUpToggle}>
          {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

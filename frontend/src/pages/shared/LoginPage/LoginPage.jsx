import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("citizen");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", userType);
        navigate(`/${userType}/dashboard`);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
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

      <div className="auth-links">
        <button onClick={handleSignUpToggle}>
          {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

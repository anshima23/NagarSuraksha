import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Import your components
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/shared/LoginPage/LoginPage";
import Home from "./pages/CitizenPage/Home/Home";
import LawEnforcementDashboard from "./pages/LawEnforcementPage/LawEnforcementDashboard/LawEnforcementDashboard";
import MunicipalDashboard from "./pages/MunicipalAuthorityPage/MunicipalDashboard/MunicipalDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in when the app is first loaded
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserRole = localStorage.getItem("userRole");

    if (token && storedUserRole) {
      setUserRole(storedUserRole);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Redirect to the appropriate dashboard page after login
  useEffect(() => {
    if (isLoggedIn && userRole) {
      switch (userRole) {
        case "citizen":
          navigate("/citizen/dashboard");
          break;
        case "law-enforcement":
          navigate("/law-enforcement/dashboard");
          break;
        case "municipal-authority":
          navigate("/municipal-authorities/dashboard");
          break;
        default:
          navigate("/login");
      }
    }
  }, [isLoggedIn, userRole, navigate]);

  return (
    <div>
      {/* Only show the Navbar if the user is logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Default route: If user is not logged in, they are redirected to login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect any other undefined route to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes - Only accessible if logged in */}
        <Route path="/citizen/dashboard" element={ <Home />} />
        <Route path="/law-enforcement/dashboard" element={<LawEnforcementDashboard />} />
        <Route path="/municipal-authorities/dashboard" element={<MunicipalDashboard />} />
        
        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default App;

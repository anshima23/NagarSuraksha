import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Header";
import Home from "./pages/CitizenPage/Home/Home";
import Dashboard from "./pages/CitizenPage/Dashboard/Dashboard";
import ReportIssue from "./pages/CitizenPage/ReportIssue/ReportIssue";
import ViewIssues from "./pages/CitizenPage/Issues/Issue/Issues";
import Institutions from "./pages/CitizenPage/Initiatives/Initiatives";
import LoginPage from "./pages/shared/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  return (
    // Ensure Router is only used once
    <Router>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Citizen Routes */}
        <Route path="/citizen/home" element={<Home />} />
        <Route path="/citizen/dashboard" element={<Dashboard />} />
        <Route path="/citizen/report-issue" element={<ReportIssue />} />
        <Route path="/citizen/view-issues" element={<ViewIssues />} />
        <Route path="/citizen/institutions" element={<Institutions />} />

        {/* Law Enforcement Routes */}
        <Route path="/law-enforcement/dashboard" element={<Dashboard />} />
        <Route path="/law-enforcement/view-crime-reports" element={<ViewIssues />} />
        <Route path="/law-enforcement/update-crime-status" element={<ReportIssue />} />

        {/* Municipal Authority Routes */}
        <Route path="/municipal-authorities/dashboard" element={<Dashboard />} />
        <Route path="/municipal-authorities/resolve-civic-issues" element={<ViewIssues />} />
        <Route path="/municipal-authorities/assign-tasks" element={<ReportIssue />} />

        {/* Authentication Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

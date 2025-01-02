import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import components
import Navbar from './components/Header/Header'; // Correct path for Navbar
import Footer from './components/Footer/Footer'; // Correct path for Footer

// Law Enforcement Pages
import LawEnforcementDashboard from './pages/LawEnforcementPage/LawEnforcementDashboard/LawEnforcementDashboard';
import ViewCrimeReports from './pages/LawEnforcementPage/ViewCrimeReports/ViewCrimeReports';
import UpdateCrimeStatus from './pages/LawEnforcementPage/UpdateCrimeStatus/UpdateCrimeStatus';

// Municipal Authorities Pages
import MunicipalDashboard from './pages/MunicipalAuthorityPage/MunicipalDashboard/MunicipalDashboard';
import ResolveCivicIssues from './pages/MunicipalAuthorityPage/ResolveCivicIssues/ResolveCivicIssues';
import AssignTasks from './pages/MunicipalAuthorityPage/AssignTasks/AssignTasks';

// Citizen Pages
import CitizenHomePage from './pages/CitizenPage/Home/Home';
import CitizenDashboard from './pages/CitizenPage/Dashboard/Dashboard';
import ReportIssue from './pages/CitizenPage/ReportIssue/ReportIssue';
import ViewIssues from './pages/CitizenPage/Issues/Issues';
import Institutions from './pages/CitizenPage/Initiatives/Initiatives';

// Shared Pages
import LoginPage from './pages/shared/LoginPage/LoginPage'; // Login page

const App = () => {
  // State to track if the user is logged in and their type
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  // Check if the user is logged in and get their type
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserType(parsedUser.userType); // Assuming `userType` is part of the stored user object
    }
  }, []);

  const renderLandingPage = () => {
    switch (userType) {
      case 'citizen':
        return <Navigate to="/citizen" />;
      case 'law-enforcement':
        return <Navigate to="/law-enforcement/dashboard" />;
      case 'municipal-authorities':
        return <Navigate to="/municipal-authorities/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      {/* Navbar will only render if the user is logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Redirect based on user type if logged in */}
        {!isLoggedIn ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/" element={renderLandingPage()} />

            {/* Routes for Citizens */}
            <Route path="/citizen" element={<CitizenHomePage />} />
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/report-issue" element={<ReportIssue />} />
            <Route path="/citizen/view-issues" element={<ViewIssues />} />
            <Route path="/citizen/institutions" element={<Institutions />} />

            {/* Routes for Law Enforcement */}
            <Route path="/law-enforcement/dashboard" element={<LawEnforcementDashboard />} />
            <Route path="/law-enforcement/view-crime-reports" element={<ViewCrimeReports />} />
            <Route path="/law-enforcement/update-crime-status" element={<UpdateCrimeStatus />} />

            {/* Routes for Municipal Authorities */}
            <Route path="/municipal-authorities/dashboard" element={<MunicipalDashboard />} />
            <Route path="/municipal-authorities/resolve-civic-issues" element={<ResolveCivicIssues />} />
            <Route path="/municipal-authorities/assign-tasks" element={<AssignTasks />} />
          </>
        )}

        {/* Shared Routes */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;

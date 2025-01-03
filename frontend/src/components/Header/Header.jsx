import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Navbar = ({ setIsLoggedIn }) => {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken"); // Check if the user is logged in
  const location = useLocation(); // Get current location to highlight active link
  const navigate = useNavigate(); // To redirect the user after logging out

  // Function to determine if a link is active
  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Handle Log Out
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // Update the logged-in state
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav>
      <div className="navbar-container">
        <h1 className="navbar-heading">NagarSuraksha</h1>

        <ul className="navbar-links">
          {/* Citizen-Specific Links */}
          {userRole === "citizen" && (
            <>
              <li><Link to="/citizen/home" className={isActive("/citizen/home")}>Home</Link></li>
              <li><Link to="/citizen/dashboard" className={isActive("/citizen/dashboard")}>Dashboard</Link></li>
              <li><Link to="/citizen/report-issue" className={isActive("/citizen/report-issue")}>Report an Issue</Link></li>
              <li><Link to="/citizen/view-issues" className={isActive("/citizen/view-issues")}>View Issues</Link></li>
              <li><Link to="/citizen/institutions" className={isActive("/citizen/institutions")}>Institutions</Link></li>
            </>
          )}

          {/* Law Enforcement-Specific Links */}
          {userRole === "law-enforcement" && (
            <>
              <li><Link to="/law-enforcement/dashboard" className={isActive("/law-enforcement/dashboard")}>Dashboard</Link></li>
              <li><Link to="/law-enforcement/view-crime-reports" className={isActive("/law-enforcement/view-crime-reports")}>View Crime Reports</Link></li>
              <li><Link to="/law-enforcement/update-crime-status" className={isActive("/law-enforcement/update-crime-status")}>Update Crime Status</Link></li>
            </>
          )}

          {/* Municipal Authorities-Specific Links */}
          {userRole === "municipal-authority" && (
            <>
              <li><Link to="/municipal-authorities/dashboard" className={isActive("/municipal-authorities/dashboard")}>Dashboard</Link></li>
              <li><Link to="/municipal-authorities/resolve-civic-issues" className={isActive("/municipal-authorities/resolve-civic-issues")}>Resolve Civic Issues</Link></li>
              <li><Link to="/municipal-authorities/assign-tasks" className={isActive("/municipal-authorities/assign-tasks")}>Assign Tasks</Link></li>
            </>
          )}
        </ul>

        {/* Logout link */}
        <div className="login-link">
          {token ? (
            <button onClick={handleLogout} className="logout-button">Logout</button> // Show Log Out button if token is present
          ) : (
            <Link to="/login">Login</Link> // Show Login if no token
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

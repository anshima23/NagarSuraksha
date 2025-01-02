import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import LogoutButton from '../LogoutButton/LogoutButton'; 

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");  // Check if the user is logged in

  return (
    <nav>
      <div className="navbar-container">
        <h1 className="navbar-heading">NagarSuraksha</h1>

        <ul className="navbar-links">
          {/* Citizen-Specific Links */}
          {userRole === "citizen" && (
            <>
              <li><Link to="/citizen/home">Home</Link></li>
              <li><Link to="/citizen/dashboard">Dashboard</Link></li>
              <li><Link to="/citizen/report-issue">Report an Issue</Link></li>
              <li><Link to="/citizen/view-issues">View Issues</Link></li>
              <li><Link to="/citizen/institutions">Institutions</Link></li>
            </>
          )}

          {/* Law Enforcement-Specific Links */}
          {userRole === "law-enforcement" && (
            <>
              <li><Link to="/law-enforcement/dashboard">Dashboard</Link></li>
              <li><Link to="/law-enforcement/view-crime-reports">View Crime Reports</Link></li>
              <li><Link to="/law-enforcement/update-crime-status">Update Crime Status</Link></li>
            </>
          )}

          {/* Municipal Authorities-Specific Links */}
          {userRole === "municipal-authority" && (
            <>
              <li><Link to="/municipal-authorities/dashboard">Dashboard</Link></li>
              <li><Link to="/municipal-authorities/resolve-civic-issues">Resolve Civic Issues</Link></li>
              <li><Link to="/municipal-authorities/assign-tasks">Assign Tasks</Link></li>
            </>
          )}
        </ul>

        {/* Only show Login or Logout depending on the user's authentication status */}
        <div className="login-link">
          {!token ? (
            <Link to="/shared/login">Login</Link>  // Show Login if no token
          ) : (
            <LogoutButton />  // Show LogoutButton if token is present
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

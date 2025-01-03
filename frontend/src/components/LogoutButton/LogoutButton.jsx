import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sending the logout request to the backend
      await axios.post('http://localhost:5000/api/auth/logout');

      // Clear localStorage or sessionStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');

      // Update the global state
      setIsLoggedIn(false);

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

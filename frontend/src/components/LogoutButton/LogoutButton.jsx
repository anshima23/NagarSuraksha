import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Sending the logout request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/logout', {});
      console.log(response.data); // Log the success message from the server

      // Optionally, remove token from localStorage or sessionStorage if you're using it
      localStorage.removeItem('token');  // If you're using localStorage
      sessionStorage.removeItem('token');  // If you're using sessionStorage

      // Redirect to login or home page
      window.location.href = '/login';  // Or any redirect URL you prefer
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

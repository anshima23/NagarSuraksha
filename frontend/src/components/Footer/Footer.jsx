import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© 2024 NagarSuraksha. All rights reserved.</p>
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

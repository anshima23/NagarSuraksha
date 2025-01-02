import React from 'react';
import './FeatureCard.css'; // Import the CSS file

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card"> {/* Apply the CSS class */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;

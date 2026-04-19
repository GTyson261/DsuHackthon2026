import React from "react";

function WhyItWorksCard({ title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon coral-icon"></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default WhyItWorksCard;
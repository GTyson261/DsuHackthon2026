import React from "react";

function OpportunityCard({ title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon gold-icon"></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default OpportunityCard;
import React from "react";

function InsightCard({ title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon orange-icon"></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default InsightCard;
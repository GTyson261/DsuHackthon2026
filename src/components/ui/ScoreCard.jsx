import React from "react";

function ScoreCard({ title, text }) {
  return (
    <div className="sector-card">
      <div className="sector-icon"></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="/">Learn More →</a>
    </div>
  );
}

export default ScoreCard;
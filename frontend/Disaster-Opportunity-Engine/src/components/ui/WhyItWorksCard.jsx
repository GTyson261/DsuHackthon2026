import React from 'react';

export default function WhyItWorksCard({ whyItWorks }) {
  return (
    <article className="card">
      <p className="card-label">Why It Wins</p>
      <h3 className="card-title">Judge Appeal</h3>
      <p className="card-text">{whyItWorks}</p>
    </article>
  );
} 
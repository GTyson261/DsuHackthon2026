import React from 'react';

export default function InsightCard({ insight }) {
  return (
    <article className="card">
      <p className="card-label">AI Insight</p>
      <h3 className="card-title">What the problem is telling us</h3>
      <p className="card-text">{insight}</p>
    </article>
  );
}
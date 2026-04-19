import React from 'react';

export default function ScoreCard({ score }) {
  const safeScore = Number.isFinite(Number(score)) ? Number(score) : 92;

  return (
    <article className="card score-card">
      <p className="card-label">Opportunity Score</p>
      <div className="score-number">{safeScore}</div>
      <p className="card-text">
        A quick visual score for how strong the opportunity looks as a hackathon pitch.
      </p>
    </article>
  );
}
import React from 'react';

export default function ScoreCard({ score, impactLevel, scoreText }) {
  const safeScore = Number.isFinite(Number(score)) ? Number(score) : 92;
  const clampedScore = Math.max(0, Math.min(100, safeScore));
  const ringDegrees = Math.round((clampedScore / 100) * 360);

  return (
    <article className="card score-card score-card-insane">
      <p className="card-label">Opportunity Score</p>

      <h3 className="score-headline">
        {impactLevel ? `${impactLevel} Impact` : 'High Impact'}
      </h3>

      <p className="score-subtext">
        {scoreText || 'Dynamic AI scoring based on real-world problem strength'}
      </p>

      <div className="score-visual-wrap">
        <div
          className="score-ring"
          style={{ '--score-deg': `${ringDegrees}deg` }}
        >
          <div className="score-ring-inner">
            <div className="score-number">{clampedScore}</div>
            <div className="score-out-of">/ 100</div>
          </div>
        </div>
      </div>

      <div className="score-footer">
        <div className="score-chip">Problem-Driven</div>
        <div className="score-chip">Pitch-Ready</div>
        <div className="score-chip">Judge-Friendly</div>
      </div>
    </article>
  );
}
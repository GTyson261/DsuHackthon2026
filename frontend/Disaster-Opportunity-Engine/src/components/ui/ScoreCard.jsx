import React, { useEffect, useMemo, useState } from 'react';

function AnimatedScore({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="score-ring-number">{display}</span>;
}

export default function ScoreCard({ score = 92, impactLevel, scoreText }) {
  const ringStyle = useMemo(() => {
    const safeScore = Math.max(0, Math.min(score, 100));
    return {
      '--score-angle': `${safeScore * 3.6}deg`,
    };
  }, [score]);

  return (
    <div className="card score-card">
      <h3>Opportunity Score</h3>

      <div className="score-ring-wrap">
        <div className="score-ring" style={ringStyle}>
          <div className="score-ring-inner">
            <AnimatedScore value={score} />
          </div>
        </div>
      </div>

      <p>{scoreText || `${impactLevel || 'MEDIUM'} impact opportunity`}</p>
    </div>
  );
}
import React, { useEffect, useState } from 'react';

function TypewriterText({ text = '', speed = 18 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    let index = 0;
    setDisplayedText('');

    const timer = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

export default function InsightCard({ insight }) {
  const hasInsight = Boolean(insight && insight.trim());

  return (
    <div className="card">
      <h3>AI Insight</h3>
      <p className="typing-text">
        {hasInsight ? (
          <>
            <TypewriterText text={insight} speed={18} />
            <span className="typing-cursor" />
          </>
        ) : (
          'The AI insight from the live event will show here after generation.'
        )}
      </p>
    </div>
  );
}
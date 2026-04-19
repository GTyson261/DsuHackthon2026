import React, { useEffect, useState } from 'react';

function TypewriterText({ text = '', speed = 16 }) {
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

export default function WhyItWorksCard({ whyItWorks }) {
  const hasText = Boolean(whyItWorks && whyItWorks.trim());

  return (
    <div className="card">
      <h3>Why It Works</h3>
      <p className="typing-text">
        {hasText ? (
          <>
            <TypewriterText text={whyItWorks} speed={16} />
            <span className="typing-cursor" />
          </>
        ) : (
          'This explains why the idea is practical, timely, and useful in a real-world situation.'
        )}
      </p>
    </div>
  );
}
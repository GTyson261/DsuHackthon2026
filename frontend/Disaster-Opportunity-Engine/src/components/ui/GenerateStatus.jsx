import React, { useEffect, useState } from 'react';

export default function GenerateStatus({ active }) {
  const messages = [
    'Scanning live event signal...',
    'Identifying real-world problem...',
    'Designing startup response...',
    'Scoring opportunity strength...',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => clearInterval(timer);
  }, [active]);

  if (!active) return null;

  return <div className="generate-status">{messages[index]}</div>;
}
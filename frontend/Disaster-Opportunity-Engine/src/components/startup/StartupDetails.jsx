import React from 'react';

const StartupDetails = ({ startup }) => {
  if (!startup) {
    return null;
  }

  return (
    <div className="startup-details-card">
      <h2 className="startup-details-title">{startup.title}</h2>

      <p className="startup-details-text">
        <strong>Problem:</strong> {startup.problem}
      </p>

      <p className="startup-details-text">
        <strong>Solution:</strong> {startup.solution}
      </p>

      <p className="startup-details-text">
        <strong>Details:</strong> {startup.details}
      </p>

      <div className="startup-score-section">
        <h3>Opportunity Score</h3>
        <p><strong>Total Score:</strong> {startup.totalScore ?? 'N/A'}</p>
        <p><strong>Urgency:</strong> {startup.urgencyScore ?? 'N/A'}</p>
        <p><strong>Market:</strong> {startup.marketScore ?? 'N/A'}</p>
        <p><strong>Feasibility:</strong> {startup.feasibilityScore ?? 'N/A'}</p>
        <p><strong>Impact:</strong> {startup.impactScore ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default StartupDetails;
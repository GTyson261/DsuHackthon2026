import React from 'react';

const getOpportunityLabel = (score) => {
  if (score >= 33) return '🔥 High-Potential Startup';
  if (score >= 26) return '🟢 Good Opportunity';
  if (score >= 16) return '🟡 Moderate Opportunity';
  return '🔴 Poor Opportunity';
};

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
        <p><strong>Rating:</strong>{' '}{startup.totalScore? getOpportunityLabel(startup.totalScore): 'N/A'}</p>
      </div>
    </div>
  );
};

export default StartupDetails;
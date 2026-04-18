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
    </div>
  );
};

export default StartupDetails;
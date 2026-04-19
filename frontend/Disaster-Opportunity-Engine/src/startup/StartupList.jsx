import React from 'react';

const StartupList = ({ startups = [], onSelectStartup }) => {
  if (startups.length === 0) {
    return (
      <div className="startup-list-empty">
        <p>No startup opportunities available yet.</p>
      </div>
    );
  }

  return (
    <div className="startup-list">
      {startups.map((startup) => (
        <div key={startup.id} className="startup-list-card">
          <h3 className="startup-list-title">{startup.title}</h3>

          <p className="startup-list-text">
            <strong>Problem:</strong> {startup.problem}
          </p>

          <p className="startup-list-text">
            <strong>Solution:</strong> {startup.solution}
          </p>

          <p className="startup-list-text">
            <strong>Total Score:</strong> {startup.totalScore ?? 'N/A'}
          </p>

          {onSelectStartup && (
            <button
              type="button"
              className="startup-list-button"
              onClick={() => onSelectStartup(startup)}
            >
              View Details
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default StartupList;
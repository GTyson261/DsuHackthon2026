import React from 'react';

export default function OpportunityCard({ title, description, id }) {
  return (
    <article className="card card-opportunity">
      <p className="card-label">Startup Opportunity</p>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>

      <div className="meta-row">
        <span>{id ? `Idea ID: ${id}` : 'New concept'}</span>
        <span>Demo Ready</span>
      </div>
    </article>
  );
}
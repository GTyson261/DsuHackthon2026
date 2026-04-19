import React from 'react';

export default function DisasterCard({ title, description, source, publishedAt }) {
  return (
    <article className="card card-disaster">
      <p className="card-label">Disaster Signal</p>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>

      <div className="meta-row">
        <span>{source || 'Unknown source'}</span>
        <span>{publishedAt ? new Date(publishedAt).toLocaleString() : 'Recent'}</span>
      </div>
    </article>
  );
}
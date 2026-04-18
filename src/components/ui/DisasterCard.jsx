function DisasterCard({ article }) {
  if (!article) return null;

  return (
    <section id="disaster" className="section-wrap section-space">
      <div className="glass-card section-card">
        <div className="card-top">
          <div>
            <div className="section-eyebrow">Breaking Crisis Detected</div>
            <h2 className="section-title">{article.title}</h2>
          </div>

          <div className="status-pill high">High Impact</div>
        </div>

        <p className="section-description">
          {article.description || "No description available."}
        </p>

        <div className="meta-row">
          <span className="meta-chip">Source: {article.source || "Unknown"}</span>
          <span className="meta-chip">Date: {article.date || "N/A"}</span>
          <span className="meta-chip">Category: Crisis Event</span>
        </div>
      </div>
    </section>
  );
}

export default DisasterCard;
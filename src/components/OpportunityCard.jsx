function OpportunityCard({ opportunity }) {
  if (!opportunity) return null;

  return (
    <section id="opportunity" className="section-wrap section-space">
      <div className="glass-card section-card">
        <div className="card-top">
          <div>
            <div className="section-eyebrow">High-Potential Startup Idea</div>
            <h2 className="opportunity-title">{opportunity.name}</h2>
          </div>

          <div className="card-icon">💡</div>
        </div>

        <p className="section-description">{opportunity.summary}</p>

        <div className="info-list">
          <div className="info-item">
            <div className="info-label">Target Users</div>
            <div className="info-value">{opportunity.targetUsers}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Revenue Model</div>
            <div className="info-value">{opportunity.revenueModel}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Why Now</div>
            <div className="info-value">{opportunity.whyNow}</div>
          </div>
        </div>

        <div className="highlight-box">
          <div className="highlight-label">Pitch Strength</div>
          This idea ties a real urgent pain point to a clear product solution,
          which makes it stand out to judges fast.
        </div>
      </div>
    </section>
  );
}

export default OpportunityCard;
function InsightCard({ insight }) {
  if (!insight) return null;

  return (
    <section id="insight" className="section-wrap section-space">
      <div className="glass-card section-card">
        <div className="card-top">
          <div>
            <div className="section-eyebrow">AI Insight</div>
            <h2 className="section-title">AI-Powered Problem Breakdown</h2>
          </div>

          <div className="card-icon">🧠</div>
        </div>

        <div className="info-list">
          <div className="info-item">
            <div className="info-label">Problem</div>
            <div className="info-value">{insight.problem}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Affected Group</div>
            <div className="info-value">{insight.affectedGroup}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Urgent Need</div>
            <div className="info-value">{insight.urgentNeed}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Market Gap</div>
            <div className="info-value">{insight.marketGap}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsightCard;
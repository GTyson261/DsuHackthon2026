function ScoreCard({ scores }) {
  if (!scores) return null;

  return (
    <section id="score" className="section-wrap section-space">
      <div className="glass-card section-card">
        <div className="card-top">
          <div>
            <div className="section-eyebrow">Score Engine</div>
            <h2 className="section-title">Judge-Ready Opportunity Score</h2>
          </div>

          <div className="card-icon">📊</div>
        </div>

        <div className="score-grid">
          <div className="score-box">
            <h3>Impact</h3>
            <p className="score-value">{scores.impact}/10</p>
          </div>

          <div className="score-box">
            <h3>Urgency</h3>
            <p className="score-value">{scores.urgency}/10</p>
          </div>

          <div className="score-box">
            <h3>Feasibility</h3>
            <p className="score-value">{scores.feasibility}/10</p>
          </div>

          <div className="score-box">
            <h3>Innovation</h3>
            <p className="score-value">{scores.innovation}/10</p>
          </div>
        </div>

        <div className="overall-score">
          <div className="overall-score-label">Overall score</div>
          <div className="overall-score-value">{scores.overall}/10</div>
        </div>
      </div>
    </section>
  );
}

export default ScoreCard;
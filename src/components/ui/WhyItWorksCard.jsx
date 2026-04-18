function WhyItWorksCard({ reasons }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className="section-wrap section-space">
      <div className="glass-card section-card">
        <div className="card-top">
          <div>
            <div className="section-eyebrow">Why It Works</div>
            <h2 className="section-title">What makes this a winning concept</h2>
          </div>

          <div className="card-icon">🏆</div>
        </div>

        <ul className="bullet-list">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WhyItWorksCard;
function HeroSection({ onGenerate }) {
  return (
    <section id="hero" className="hero">
      <div className="section-wrap">
        <div className="hero-card">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="section-eyebrow">Hackathon Innovation Engine</div>

              <h1>Turn global disasters into the next big startup idea.</h1>

              <p>
                We scan breaking crisis news, uncover urgent real-world
                problems, and transform them into high-impact business
                opportunities using AI.
              </p>

              <div className="hero-badges">
                <span className="hero-badge">Live News Analysis</span>
                <span className="hero-badge">AI Opportunity Discovery</span>
                <span className="hero-badge">Startup Scoring</span>
              </div>

              <div className="hero-actions">
                <button className="primary-btn" onClick={onGenerate}>
                  Generate Winning Idea
                </button>

                <a href="#disaster" className="secondary-btn demo-link">
                  Explore Demo
                </a>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-logo-panel">
                <img
                  src="/Disaster-Opportunity.png"
                  alt="Disaster Opportunity Engine brand graphic"
                  className="hero-logo"
                />
              </div>

              <div className="hero-stat floating-card">
                <div className="hero-stat-label">Latest Problem Signal</div>
                <div className="hero-stat-value">Supply Chain Crisis</div>
                <div className="hero-stat-note">
                  AI found an urgent gap in emergency delivery systems
                </div>
              </div>

              <div className="hero-stat floating-card delay-1">
                <div className="hero-stat-label">Generated Startup</div>
                <div className="hero-stat-value">RapidRelief</div>
                <div className="hero-stat-note">
                  A platform for fast emergency logistics coordination
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
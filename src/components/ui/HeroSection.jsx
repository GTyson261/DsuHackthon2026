import heroImage from "../../assets/Disaster-Opportunity-Engine.png";

function HeroSection() {
  return (
    <section className="landing-page" id="home">
      <div className="landing-grid">
        <div className="left-column">
          <section className="hero-card">
            <div className="hero-copy">
              <h1>
                TURN DISRUPTION
                <br />
                INTO <span>OPPORTUNITY</span>
              </h1>

              <p>
                The Disaster Opportunity Engine helps organizations transform
                chaos into growth with AI-driven insights, real-time
                intelligence, and scenario planning.
              </p>

              <div className="hero-actions">
                <button className="hero-primary">Get Started</button>
                <button className="hero-secondary">See How It Works</button>
              </div>

              <div className="trusted">
                <div className="trusted-label">TRUSTED BY LEADERS WORLDWIDE</div>
                <div className="trusted-logos">
                  <span>WHO</span>
                  <span>World Bank</span>
                  <span>UNICEF</span>
                  <span>Microsoft</span>
                  <span>AWS</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-box">
                <img
                  src={heroImage}
                  alt="Disaster Opportunity Engine visual"
                  className="hero-image"
                />
              </div>
            </div>
          </section>

          <section className="dark-section" id="how">
            <h2>THE POWER TO TRANSFORM</h2>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">◎</div>
                <h3>Real-Time Intelligence</h3>
                <p>
                  Monitor global threats and opportunities in real time with
                  advanced AI.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">◉</div>
                <h3>AI-Powered Insights</h3>
                <p>
                  Turn complex data into clear, actionable strategies for faster
                  decisions.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">↗</div>
                <h3>Scenario Planning</h3>
                <p>
                  Simulate multiple futures and prepare for every possible
                  outcome.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">▣</div>
                <h3>Growth Acceleration</h3>
                <p>
                  Identify emerging opportunities and accelerate your
                  competitive edge.
                </p>
              </div>
            </div>
          </section>

          <section className="dark-section">
            <h2>HOW IT WORKS</h2>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-dot">1</div>
                <h3>Detect</h3>
                <p>
                  We continuously monitor global events, risks, and market
                  shifts.
                </p>
              </div>

              <div className="step-card">
                <div className="step-dot">2</div>
                <h3>Analyze</h3>
                <p>
                  AI algorithms analyze patterns and uncover hidden
                  opportunities.
                </p>
              </div>

              <div className="step-card">
                <div className="step-dot">3</div>
                <h3>Prioritize</h3>
                <p>
                  We rank opportunities based on impact, feasibility, and
                  timing.
                </p>
              </div>

              <div className="step-card">
                <div className="step-dot">4</div>
                <h3>Act</h3>
                <p>
                  Teams move forward with smarter, faster, and more confident
                  decisions.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="right-column">
          <section className="light-panel" id="solutions">
            <h2>SOLUTIONS FOR EVERY SECTOR</h2>

            <div className="sector-grid">
              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>Government</h3>
                <p>Strengthen resilience and make smarter decisions.</p>
                <a href="#home">Learn More →</a>
              </div>

              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>Business</h3>
                <p>Anticipate disruption and uncover new avenues for growth.</p>
                <a href="#home">Learn More →</a>
              </div>

              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>Healthcare</h3>
                <p>Ensure continuity of care and optimize health resilience.</p>
                <a href="#home">Learn More →</a>
              </div>

              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>Finance</h3>
                <p>Manage risk, ensure compliance, and discover opportunities.</p>
                <a href="#home">Learn More →</a>
              </div>

              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>Infrastructure</h3>
                <p>Build smarter, more adaptive systems for the future.</p>
                <a href="#home">Learn More →</a>
              </div>

              <div className="sector-card">
                <div className="sector-dot"></div>
                <h3>NGOs</h3>
                <p>Maximize impact and allocate resources where needed most.</p>
                <a href="#home">Learn More →</a>
              </div>
            </div>
          </section>

          <section className="map-panel">
            <h2>REAL-TIME INTELLIGENCE. REAL IMPACT.</h2>
            <div className="map-box">
              <div className="map-list">
                <span>Global Event Monitoring</span>
                <span>Risk & Opportunity Scoring</span>
                <span>Actionable Recommendations</span>
              </div>
              <div className="map-visual">GLOBAL VIEW</div>
            </div>
          </section>

          <section className="trust-panel">
            <h2>TRUSTED BY LEADERS WORLDWIDE</h2>
            <div className="trust-grid">
              <span>World Health Organization</span>
              <span>World Bank</span>
              <span>UNICEF</span>
              <span>Microsoft</span>
              <span>Google</span>
              <span>AWS</span>
            </div>
          </section>

          <section className="cta-panel">
            <div>
              <h3>READY TO TURN DISASTER INTO OPPORTUNITY?</h3>
              <p>Join leaders using AI to build a more resilient future.</p>
            </div>
            <button>Get Started Today</button>
          </section>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
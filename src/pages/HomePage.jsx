import React from "react";
import Header from "../components/ui/Header";
import HeroSection from "../components/ui/HeroSection";
import DisasterCard from "../components/ui/DisasterCard";
import InsightCard from "../components/ui/InsightCard";
import OpportunityCard from "../components/ui/OpportunityCard";
import WhyItWorksCard from "../components/ui/WhyItWorksCard";
import ScoreCard from "../components/ui/ScoreCard";

function HomePage() {
  return (
    <div className="app">
      <Header />

      <main className="page-layout">
        <section className="left-column">
          <HeroSection />

          <section className="dark-panel">
            <div className="section-header">
              <h2>THE POWER TO TRANSFORM</h2>
              <div className="section-line"></div>
            </div>

            <div className="feature-grid">
              <DisasterCard
                title="Real-Time Intelligence"
                text="Monitor global threats and opportunities in real time with advanced AI."
              />
              <InsightCard
                title="AI-Powered Insights"
                text="Turn complex data into clear, actionable strategies for faster decisions."
              />
              <OpportunityCard
                title="Scenario Planning"
                text="Simulate multiple futures and prepare for every possible outcome."
              />
              <WhyItWorksCard
                title="Growth Acceleration"
                text="Identify emerging opportunities and accelerate your competitive edge."
              />
            </div>
          </section>

          <section className="dark-panel" id="how">
            <div className="section-header">
              <h2>HOW IT WORKS</h2>
              <div className="section-line"></div>
            </div>

            <div className="steps-row">
              <div className="step-card">
                <div className="step-icon">1</div>
                <h3>Detect</h3>
                <p>We continuously monitor global events, risks, and market shifts.</p>
              </div>

              <div className="step-connector"></div>

              <div className="step-card">
                <div className="step-icon">2</div>
                <h3>Analyze</h3>
                <p>AI algorithms analyze patterns and uncover hidden opportunities.</p>
              </div>

              <div className="step-connector"></div>

              <div className="step-card">
                <div className="step-icon">3</div>
                <h3>Prioritize</h3>
                <p>We rank opportunities based on impact, feasibility, and timing.</p>
              </div>

              <div className="step-connector"></div>

              <div className="step-card">
                <div className="step-icon">4</div>
                <h3>Act</h3>
                <p>Take action with confidence and turn insights into results.</p>
              </div>
            </div>
          </section>
        </section>

        <section className="right-column">
          <section className="light-panel" id="solutions">
            <div className="section-header light">
              <h2>SOLUTIONS FOR EVERY SECTOR</h2>
              <div className="section-line"></div>
            </div>

            <div className="solutions-grid">
              <ScoreCard title="Government" text="Strengthen resilience and make smarter decisions for communities." />
              <ScoreCard title="Business" text="Anticipate disruptions and unlock new avenues for growth." />
              <ScoreCard title="Healthcare" text="Ensure continuity of care and optimize health system resilience." />
              <ScoreCard title="Finance" text="Manage risk, ensure compliance, and discover new market opportunities." />
              <ScoreCard title="Infrastructure" text="Build stronger, smarter, and more adaptive infrastructure." />
              <ScoreCard title="NGOs" text="Maximize impact and allocate resources where they are needed most." />
            </div>
          </section>

          <section className="dark-panel" id="use-cases">
            <div className="section-header">
              <h2>
                REAL-TIME INTELLIGENCE. <span>REAL IMPACT.</span>
              </h2>
              <div className="section-line"></div>
            </div>

            <div className="intel-layout">
              <div className="intel-list">
                <div className="intel-item">
                  <h4>Global Event Monitoring</h4>
                  <p>Track emergencies, crises, and trends as they unfold.</p>
                </div>

                <div className="intel-item">
                  <h4>Risk & Opportunity Scoring</h4>
                  <p>AI scores potential impact and opportunity in real time.</p>
                </div>

                <div className="intel-item">
                  <h4>Actionable Recommendations</h4>
                  <p>Get clear recommendations to act faster and smarter.</p>
                </div>
              </div>

              <div className="map-card">
                <div className="map-placeholder">
                  <div className="map-dot dot1"></div>
                  <div className="map-dot dot2"></div>
                  <div className="map-dot dot3"></div>
                  <div className="map-dot dot4"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="light-panel" id="about">
            <div className="section-header light">
              <h2>TRUSTED BY LEADERS WORLDWIDE</h2>
              <div className="section-line"></div>
            </div>

            <div className="testimonial-box">
              <p className="quote-mark">“</p>
              <p className="testimonial-text">
                The Disaster Opportunity Engine has revolutionized how we approach
                risk and opportunity. It’s an essential part of our strategic
                decision-making.
              </p>
              <p className="testimonial-name">— Sarah Johnson</p>
              <p className="testimonial-role">Chief Strategy Officer, Global Enterprise</p>
            </div>

            <div className="logo-grid">
              <div>WHO</div>
              <div>World Bank</div>
              <div>UNICEF</div>
              <div>Microsoft</div>
              <div>Google</div>
              <div>AWS</div>
            </div>
          </section>

          <section className="cta-banner">
            <div className="cta-left">
              <div className="cta-circle">✉</div>
              <div>
                <h3>READY TO TURN DISASTER INTO OPPORTUNITY?</h3>
                <p>Join leaders who are building a more resilient and prosperous future.</p>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

import miniLogo from "../assets/mini-logo.png";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <img src={miniLogo} alt="logo" className="dashboard-brand-icon" />
          <div>
            <h2>Disaster Opportunity Engine</h2>
            <p>Dashboard</p>
          </div>
        </div>

        <Link to="/" className="dashboard-back-btn">
          ← Back Home
        </Link>
      </header>

      <main className="dashboard-layout">
        <section className="dashboard-hero-card">
          <div>
            <p className="dashboard-label">Latest problem signal</p>
            <h1>Supply Chain Crisis</h1>
            <p className="dashboard-subtext">
              AI found an urgent gap in emergency delivery systems and identified
              multiple startup opportunities.
            </p>
          </div>

          <div className="dashboard-score-card">
            <span>Impact Score</span>
            <h2>78</h2>
            <p>High Potential</p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <p className="dashboard-label">Generated Startup</p>
            <h3>RapidRelief</h3>
            <p>AI-powered emergency supply chain platform.</p>
            <div className="dashboard-stat-row">
              <span>ROI Potential</span>
              <strong>$12.4M</strong>
            </div>
          </div>

          <div className="dashboard-card">
            <p className="dashboard-label">Trend Analysis</p>
            <h3>Disruptions Detected</h3>
            <p>128 major signals this week across logistics, health, and infrastructure.</p>
            <div className="dashboard-stat-row">
              <span>Growth Change</span>
              <strong>+23%</strong>
            </div>
          </div>

          <div className="dashboard-card">
            <p className="dashboard-label">Top Opportunity</p>
            <h3>Flood Risk AI Scoring</h3>
            <p>Predictive risk scoring for communities and insurers.</p>
            <div className="dashboard-stat-row">
              <span>Feasibility</span>
              <strong>High</strong>
            </div>
          </div>

          <div className="dashboard-card">
            <p className="dashboard-label">Action Steps</p>
            <h3>Next Best Actions</h3>
            <ul className="dashboard-list">
              <li>Review live crisis signals</li>
              <li>Compare startup ideas</li>
              <li>Rank by impact and feasibility</li>
              <li>Export recommendation summary</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
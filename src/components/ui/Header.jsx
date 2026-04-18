function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-block">
          <img
            src="/Disaster-Opportunity.png"
            alt="Disaster Opportunity Engine logo"
            className="site-logo"
          />

          <div className="logo-text">
            <p className="logo-title">Disaster → Opportunity Engine</p>
            <p className="logo-subtitle">AI that finds innovation in chaos</p>
          </div>
        </div>

        <nav className="nav">
          <a href="#hero">Home</a>
          <a href="#disaster">Disaster</a>
          <a href="#insight">Insight</a>
          <a href="#opportunity">Opportunity</a>
          <a href="#score">Score</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
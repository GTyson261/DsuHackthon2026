import miniLogo from "../../assets/mini-logo.png";

function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <img
            src={miniLogo}
            alt="Disaster Opportunity Engine logo"
            className="topbar-logo"
          />

          <div className="topbar-text">
            <p className="topbar-title">Disaster Opportunity Engine</p>
            <p className="topbar-subtitle">AI that finds innovation in chaos</p>
          </div>
        </div>

        <nav className="topbar-nav">
          <a href="#home" className="active">Home</a>
          <a href="#how">How It Works</a>
          <a href="#solutions">Solutions</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#about">About Us</a>
        </nav>

        <button className="topbar-btn">Get Started</button>
      </div>
    </header>
  );
}

export default Header;
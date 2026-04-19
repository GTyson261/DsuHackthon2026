import React from 'react';
import logo from "../../assets/logo.png";
export default function Header({ appTitle, user }) {
  return (
    <header className="site-header">
      <div className="header-brand">
        <img src={logo} alt="Disaster Opportunity Engine" />
        <div className="header-text">
          <h1 className="site-title">{appTitle}</h1>
          <p className="tagline">From live events to real-world solutions</p>
        </div>
      </div>

      <div className="user-pill">
        {user ? `Logged in as ${user.username}` : 'Not logged in'}
      </div>
    </header>
  );
}
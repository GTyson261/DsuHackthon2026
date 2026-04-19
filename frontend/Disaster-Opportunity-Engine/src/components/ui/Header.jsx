import React from 'react';

export default function Header({ appTitle, user }) {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Hackathon Demo</p>
        <h1 className="site-title">{appTitle}</h1>
      </div>

      <div className="user-pill">
        {user ? `Logged in as ${user.username}` : 'Not logged in'}
      </div>
    </header>
  );
}
import React from 'react';

export default function HeroSection({
  authMode,
  setAuthMode,
  credentials,
  onCredentialChange,
  onAuthSubmit,
  onGenerateIdea,
  authLoading,
  generateLoading,
  dashboardLoading,
  canSubmitAuth,
  currentUser,
  error,
  statusMessage,
}) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">AI + News + Startups</p>
        <h2 className="hero-title">Turn bad events into winning startup ideas.</h2>
        <p className="hero-text">
          Disaster → Opportunity Engine watches real-world disruption and transforms
          it into practical startup concepts judges can understand immediately.
        </p>

        <div className="hero-badges">
          <span>Spring Boot</span>
          <span>MySQL</span>
          <span>React + Vite</span>
          <span>AI Generation</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="mode-toggle">
          <button
            className={authMode === 'login' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setAuthMode('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={authMode === 'signup' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setAuthMode('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={credentials.username}
            onChange={onCredentialChange}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={onCredentialChange}
            placeholder="Enter password"
          />
        </div>

        <button
          className="primary-btn"
          type="button"
          onClick={onAuthSubmit}
          disabled={!canSubmitAuth || authLoading}
        >
          {authLoading
            ? 'Please wait...'
            : authMode === 'signup'
            ? 'Create Account'
            : 'Login'}
        </button>

        <button
          className="accent-btn"
          type="button"
          onClick={onGenerateIdea}
          disabled={!currentUser || generateLoading}
        >
          {generateLoading
            ? 'Generating...'
            : 'Generate Winning Idea'}
        </button>

        {dashboardLoading && (
          <p className="helper-text">Loading your latest dashboard data...</p>
        )}

        {statusMessage && <p className="success-text">{statusMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </section>
  );
}
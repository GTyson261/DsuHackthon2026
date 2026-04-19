import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = () => {
  const navigate = useNavigate();

  const handleEnterDemo = () => {
    navigate('/dashboard');
  };

  return (
    <section className="login-signup-page">
      <div className="login-signup-card">
        <h1>Disaster → Opportunity Engine</h1>
        <p>
          Turn real-world problems into startup ideas, recovery solutions, and business opportunities.
        </p>

        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <div className="auth-button-group">
          <button type="button" className="auth-button" onClick={handleEnterDemo}>
            Login
          </button>

          <button type="button" className="auth-button secondary" onClick={handleEnterDemo}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginSignupPage;
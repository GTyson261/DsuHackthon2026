import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = (event) => {
  event.preventDefault();

  if (!email || !password) {
    return;
  }

  setIsLoggedIn();
  navigate('/dashboard');
};

  return (
    <section>
      <h1>Disaster → Opportunity Engine</h1>
      <p>
        Turn real-world problems into startup ideas, recovery solutions, and business opportunities.
      </p>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
        <button type="button" onClick={handleLogin}>
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default LoginSignupPage;
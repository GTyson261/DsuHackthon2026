import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StartupList from '../startup/StartupList.jsx';

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const storedStartups = JSON.parse(localStorage.getItem('startups')) || [];
    setStartups(storedStartups);
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleClearStartups = () => {
    localStorage.removeItem('startups');
    setStartups([]);
  };

  const handleSelectStartup = (startup) => {
    navigate(`/startups/${startup.id}`);
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Disaster → Opportunity Engine</p>

        <button type="button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>

      <div className="dashboard-actions">
        <h2>Quick Actions</h2>

        <Link to="/startups/new">
          <button type="button">
            Create New Startup
          </button>
        </Link>

        {startups.length > 0 ? (
          <Link to={`/startups/${startups[0].id}`}>
            <button type="button">
              View Example Startup
            </button>
          </Link>
        ) : (
          <button type="button" disabled>
            View Example Startup
          </button>
        )}

        <button type="button" onClick={handleClearStartups}>
          Clear All Startups
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Your Startups</h2>

        {startups.length === 0 ? (
          <p>No startups yet. Start by creating one!</p>
        ) : (
          <StartupList
            startups={startups}
            onSelectStartup={handleSelectStartup}
          />
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
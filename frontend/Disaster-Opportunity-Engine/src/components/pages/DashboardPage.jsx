import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartupList from '../startup/StartupList.jsx';

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const [startups, setStartups] = useState([]);

  // Handles logout button click
  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const goToCreate = () => {
    navigate('/startups/new');
  };

 const goToViewExample = () => {
  if (startups.length > 0) {
    navigate(`/startups/${startups[0].id}`);
  }
};

  // Load startups from localStorage when page loads
  useEffect(() => {
    const storedStartups =
      JSON.parse(localStorage.getItem('startups')) || [];

    setStartups(storedStartups);
  }, []);

  // clear all (useful for testing)
  const clearStartups = () => {
    localStorage.removeItem('startups');
    setStartups([]);
  };

  return (
    <section className="dashboard-page">
      
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Disaster → Opportunity Engine</p>

        <button onClick={handleLogoutClick}>
          Logout
        </button>
      </div>

      {/* Main Actions */}
      <div className="dashboard-actions">
        <h2>Quick Actions</h2>

        <button onClick={goToCreate}>
          Create New Startup
        </button>

        <button onClick={goToViewExample} disabled={startups.length === 0}>
          View Example Startup
        </button>

        {/* Optional Clear Button */}
        <button onClick={clearStartups}>
          Clear All Startups
        </button>
      </div>

      {/* Startup Content */}
      <div className="dashboard-content">
        <h2>Your Startups</h2>

        {startups.length === 0 ? (
          <p>No startups yet. Start by creating one!</p>
        ) : (
          <StartupList startups={startups} />
        )}
      </div>

    </section>
  );
};

export default DashboardPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StartupList from '../components/startup/StartupList';

const mockStartups = [
  {
    id: 1,
    title: 'Flood Recovery Network',
    problem: 'Communities affected by flooding struggle with recovery coordination.',
    solution: 'A platform for response coordination, resource tracking, and recovery planning.',
    details: 'Focused on local governments, nonprofits, and affected residents.',
  },
  {
    id: 2,
    title: 'Power Grid Alert Hub',
    problem: 'Power outages slow emergency response and disrupt daily life.',
    solution: 'A real-time outage communication and emergency coordination platform.',
    details: 'Focused on utilities, municipalities, and emergency teams.',
  },
  {
    id: 3,
    title: 'Wildfire Shelter Match',
    problem: 'Displaced families struggle to find temporary shelter quickly.',
    solution: 'A matching system connecting evacuees with safe shelter and support resources.',
    details: 'Focused on evacuation zones and community partnerships.',
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleCreateStartup = () => {
    navigate('/startups/new');
  };

  const handleSelectStartup = (startup) => {
    navigate(`/startups/${startup.id}`);
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Explore generated startup opportunities or create a new one.</p>

        <button
          type="button"
          className="dashboard-create-button"
          onClick={handleCreateStartup}
        >
          Create Startup Opportunity
        </button>
      </div>

      <StartupList startups={mockStartups} onSelectStartup={handleSelectStartup} />
    </section>
  );
};

export default DashboardPage;
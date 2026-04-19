import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StartupDetails from '../components/startup/StartupDetails';

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

const ViewStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const startup = mockStartups.find((item) => String(item.id) === String(id));

  const handleEditStartup = () => {
    navigate(`/startups/${id}/edit`);
  };

  if (!startup) {
    return (
      <section className="view-startup-page">
        <h1>Startup Not Found</h1>
        <p>The startup opportunity you are looking for does not exist.</p>
      </section>
    );
  }

  return (
    <section className="view-startup-page">
      <div className="view-startup-header">
        <h1>View Startup Opportunity</h1>

        <button
          type="button"
          className="edit-startup-page-button"
          onClick={handleEditStartup}
        >
          Edit Startup
        </button>
      </div>

      <StartupDetails startup={startup} />
    </section>
  );
};

export default ViewStartupPage;
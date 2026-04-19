import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StartupDetails from '../startup/StartupDetails.jsx';

const ViewStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const storedStartups = JSON.parse(localStorage.getItem('startups')) || [];

  const startup = storedStartups.find(
    (item) => String(item.id) === String(id)
  );

  const handleEditStartup = () => {
    navigate(`/startups/${id}/edit`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleDeleteStartup = () => {
    const updatedStartups = storedStartups.filter(
      (item) => String(item.id) !== String(id)
    );

    localStorage.setItem('startups', JSON.stringify(updatedStartups));
    navigate('/dashboard');
  };

  if (!startup) {
    return (
      <section className="view-startup-page">
        <h1>Startup Not Found</h1>
        <p>The startup opportunity you are looking for does not exist.</p>

        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="view-startup-page">
      <div className="view-startup-header">
        <h1>View Startup Opportunity</h1>

        <button type="button" onClick={handleEditStartup}>
          Edit Startup
        </button>

        <button type="button" onClick={handleDeleteStartup}>
          Delete Startup
        </button>

        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      <StartupDetails startup={startup} />
    </section>
  );
};

export default ViewStartupPage;
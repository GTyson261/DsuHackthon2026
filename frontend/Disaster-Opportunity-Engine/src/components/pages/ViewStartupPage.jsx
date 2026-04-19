import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStartupRecordById, deleteStartupRecord } from '../services/startupService.js';
import StartupDetails from '../startup/StartupDetails.jsx';

const ViewStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [startup, setStartup] = useState(null);

  useEffect(() => {
    const loadStartup = async () => {
      const data = await getStartupRecordById(id);
      setStartup(data);
    };

    loadStartup();
  }, [id]);

  const handleEditStartup = () => {
    navigate(`/startups/${id}/edit`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleDeleteStartup = async () => {
    await deleteStartupRecord(id);
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
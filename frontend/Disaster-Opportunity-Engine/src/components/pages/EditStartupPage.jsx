import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditStartupForm from '../startup/EditStartupForm.jsx';

const EditStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const storedStartups = JSON.parse(localStorage.getItem('startups')) || [];

  const startupToEdit = storedStartups.find(
    (item) => String(item.id) === String(id)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveStartup = (updatedStartup) => {
    setIsLoading(true);
    setError('');

    try {
      const startups = JSON.parse(localStorage.getItem('startups')) || [];

      const updatedStartups = startups.map((startup) =>
        String(startup.id) === String(id) ? updatedStartup : startup
      );

      localStorage.setItem('startups', JSON.stringify(updatedStartups));

      navigate(`/startups/${updatedStartup.id}`);
    } catch (err) {
      setError('Failed to save startup changes.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!startupToEdit) {
    return (
      <section className="edit-startup-page">
        <h1>Startup Not Found</h1>
        <p>The startup you want to edit could not be found.</p>

        <button type="button" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="edit-startup-page">
      <div className="edit-startup-page-header">
        <h1>Edit Startup Opportunity</h1>
        <p>Update the startup details and save your changes.</p>
      </div>

      <EditStartupForm
        startup={startupToEdit}
        onSaveStartup={handleSaveStartup}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

export default EditStartupPage;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStartupRecordById, updateStartupRecord } from '../services/api.js';
import EditStartupForm from '../startup/EditStartupForm.jsx';

const EditStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [startupToEdit, setStartupToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStartup = async () => {
      const data = await getStartupRecordById(id);
      setStartupToEdit(data);
    };

    loadStartup();
  }, [id]);

  const handleSaveStartup = async (updatedStartup) => {
    setIsLoading(true);
    setError('');

    try {
      await updateStartupRecord(id, updatedStartup);
      navigate(`/startups/${id}`);
    } catch {
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
import React, { useState } from 'react';
import CreateStartupForm from '../startup/CreateStartupForm.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';
import StartupDetails from '../startup/StartupDetails.jsx';
import { createStartup } from '../services/api.js';

const CreateStartupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedStartup, setGeneratedStartup] = useState(null);

  const handleCreateStartup = async (formData) => {
  setIsLoading(true);
  setError('');
  setGeneratedStartup(null);

  const startupPayload = {
    title: `${formData.disaster} Recovery Network`,
    problem: `Communities affected by ${formData.disaster} struggle with recovery coordination.`,
    solution: `A startup platform serving the ${formData.industry} sector in ${
      formData.location || 'target regions'
    } by offering response coordination, resource tracking, and recovery planning tools.`,
    details: formData.details || 'No additional details provided.',
  };

  try {
    const newStartup = await createStartup(startupPayload);
    setGeneratedStartup(newStartup);
  } catch (err) {
    setError(err.message || 'Failed to generate startup opportunity.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="create-startup-page">
      <div className="create-startup-page-header">
        <h1>Create a Startup Opportunity</h1>
        <p>Enter a disaster or problem and generate a startup concept.</p>
      </div>

      <CreateStartupForm
        onSubmitStartup={handleCreateStartup}
        isLoading={isLoading}
        error={error}
      />

      {isLoading && (
        <LoadingSpinner message="Generating startup opportunity..." />
      )}

      {generatedStartup && !isLoading && (
        <StartupDetails startup={generatedStartup} />
      )}
    </section>
  );
};

export default CreateStartupPage;
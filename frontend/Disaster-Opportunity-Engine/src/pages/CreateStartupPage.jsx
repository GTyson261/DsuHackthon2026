import React, { useState } from 'react';
import CreateStartupForm from '../components/startup/CreateStartupForm';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import StartupDetails from '../components/startup/StartupDetails';

const CreateStartupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedStartup, setGeneratedStartup] = useState(null);

  const handleCreateStartup = (formData) => {
    setIsLoading(true);
    setError('');
    setGeneratedStartup(null);

    setTimeout(() => {
      try {
        const mockStartup = {
          id: Date.now(),
          title: `${formData.disaster} Recovery Network`,
          problem: `Communities affected by ${formData.disaster} struggle with recovery coordination.`,
          solution: `A startup platform serving the ${formData.industry} sector in ${formData.location || 'target regions'} by offering response coordination, resource tracking, and recovery planning tools.`,
          details: formData.details || 'No additional details provided.',
        };

        setGeneratedStartup(mockStartup);
      } catch (err) {
        setError('Failed to generate startup opportunity.');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
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
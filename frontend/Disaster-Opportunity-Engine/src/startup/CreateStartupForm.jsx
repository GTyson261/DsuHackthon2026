import React, { useState } from 'react';
import CreateStartupForm from '../components/startup/CreateStartupForm';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

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
          title: `${formData.disaster} Recovery Network`,
          problem: `Communities affected by ${formData.disaster} struggle with recovery coordination.`,
          solution: `A startup platform serving the ${formData.industry} space in ${formData.location} by offering disaster response coordination, resource tracking, and recovery planning tools.`,
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
        <p>
          Turn a disaster or problem into a startup idea by entering a few key details below.
        </p>
      </div>

      <CreateStartupForm
        onSubmitStartup={handleCreateStartup}
        isLoading={isLoading}
        error={error}
      />

      {isLoading && (
        <LoadingSpinner message="Generating startup opportunity..." />
      )}

      {error && !isLoading && (
        <ErrorMessage
          message={error}
          onRetry={() => setError('')}
        />
      )}

      {generatedStartup && !isLoading && (
        <div className="generated-startup-result">
          <h2>{generatedStartup.title}</h2>
          <p>
            <strong>Problem:</strong> {generatedStartup.problem}
          </p>
          <p>
            <strong>Solution:</strong> {generatedStartup.solution}
          </p>
          <p>
            <strong>Details:</strong> {generatedStartup.details}
          </p>
        </div>
      )}
    </section>
  );
};

export default CreateStartupPage;
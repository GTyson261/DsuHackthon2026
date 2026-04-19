import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateStartupForm from '../startup/CreateStartupForm.jsx';
import LoadingSpinner from '../shared/LoadingSpinner.jsx';
import StartupDetails from '../startup/StartupDetails.jsx';
import { createStartup } from '../services/api.js';

const saveToLocalStorage = (startup) => {
  const existingStartups = JSON.parse(localStorage.getItem('startups')) || [];
  const updatedStartups = [startup, ...existingStartups];
  localStorage.setItem('startups', JSON.stringify(updatedStartups));
};

const calculateScores = (formData) => {
  let urgencyScore = 5;
  let marketScore = 5;
  let feasibilityScore = 5;
  let impactScore = 5;

  const disasterText = `${formData.disaster} ${formData.details}`.toLowerCase();
  const industryText = `${formData.industry}`.toLowerCase();

  if (
    disasterText.includes('fire') ||
    disasterText.includes('flood') ||
    disasterText.includes('tornado') ||
    disasterText.includes('earthquake') ||
    disasterText.includes('wildfire')
  ) {
    urgencyScore += 3;
    impactScore += 2;
  }

  if (
    industryText.includes('health') ||
    industryText.includes('housing') ||
    industryText.includes('energy') ||
    industryText.includes('restaurant') ||
    industryText.includes('transport')
  ) {
    marketScore += 2;
  }

  if (
    disasterText.includes('tracking') ||
    disasterText.includes('planning') ||
    disasterText.includes('coordination')
  ) {
    feasibilityScore += 1;
  }

    urgencyScore = Math.min(10, urgencyScore);
    marketScore = Math.min(10, marketScore);
    feasibilityScore = Math.min(10, feasibilityScore);
    impactScore = Math.min(10, impactScore);

    const totalScore = Math.round(
    (
    urgencyScore * 0.3 +
    marketScore * 0.25 +
    feasibilityScore * 0.2 +
    impactScore * 0.25
    ) * 4
    );
    return {
    urgencyScore,
    marketScore,
    feasibilityScore,
    impactScore,
    totalScore,
  };
};

const CreateStartupPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedStartup, setGeneratedStartup] = useState(null);

  const handleCreateStartup = async (formData) => {
    setIsLoading(true);
    setError('');
    setGeneratedStartup(null);

    const scores = calculateScores(formData);

    const startupPayload = {
      title: `${formData.disaster} Recovery Network`,
      problem: `Communities affected by ${formData.disaster} struggle with recovery coordination.`,
      solution: `A startup platform serving the ${formData.industry} sector in ${
        formData.location || 'target regions'
      } by offering response coordination, resource tracking, and recovery planning tools.`,
      details: formData.details || 'No additional details provided.',
      location: formData.location || '',
      industry: formData.industry || '',
      disaster: formData.disaster || '',
      ...scores,
    };

    try {
      const newStartup = await createStartup(startupPayload);
      saveToLocalStorage(newStartup);
      setGeneratedStartup(newStartup);
    } catch {
      const mockStartup = {
        id: Date.now(),
        ...startupPayload,
      };

      saveToLocalStorage(mockStartup);
      setGeneratedStartup(mockStartup);
      setError('Backend not connected yet. Showing mock startup result.');
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
        <>
          <StartupDetails startup={generatedStartup} />

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{ marginTop: '20px' }}
          >
            Go to Dashboard
          </button>
        </>
      )}
    </section>
  );
};

export default CreateStartupPage;
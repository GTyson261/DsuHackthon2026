// src/pages/HomePage.jsx

import React, { useState } from 'react';
import GenerateButton from '../components/shared/GenerateButton';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';


import { generateOpportunities } from '../services/api';

const HomePage = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await generateOpportunities();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while generating results.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <HeroSection />

      <GenerateButton
        onClick={handleGenerate}
        isLoading={isLoading}
        text="Generate Startup Opportunities"
      />

      {isLoading && (
        <LoadingSpinner message="Analyzing disaster events and generating ideas..." />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={handleGenerate}
        />
      )}

      {results && (
        <section className="results-section">
          <DisasterCard disaster={results.disaster} />
          <InsightCard insight={results.insight} />
          <OpportunityCard opportunity={results.opportunity} />
          <WhyItWorksCard whyItWorks={results.whyItWorks} />
          <ScoreCard score={results.score} />
        </section>
      )}
    </main>
  );
};

export default HomePage;
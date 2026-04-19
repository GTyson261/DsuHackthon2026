import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/ui/Header';
import HeroSection from './components/ui/HeroSection';
import DisasterCard from './components/ui/DisasterCard';
import InsightCard from './components/ui/InsightCard';
import OpportunityCard from './components/ui/OpportunityCard';
import WhyItWorksCard from './components/ui/WhyItWorksCard';
import ScoreCard from './components/ui/ScoreCard';
import GenerateStatus from './components/ui/GenerateStatus';
import {
  login,
  signup,
  generateStartup,
  getDashboard,
  normalizeStartupPayload,
} from './services/api';
import './wow.css';

export default function App() {
  const [authMode, setAuthMode] = useState('login');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [startupData, setStartupData] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const canSubmitAuth = useMemo(() => {
    return credentials.username.trim() && credentials.password.trim();
  }, [credentials]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const loadDashboard = async () => {
      try {
        setDashboardLoading(true);
        const dashboard = await getDashboard(currentUser.id);

        let latestIdea = null;

        if (Array.isArray(dashboard)) {
          latestIdea = dashboard[0] || null;
        } else if (Array.isArray(dashboard?.startups)) {
          latestIdea = dashboard.startups[0] || null;
        } else if (Array.isArray(dashboard?.startupIdeas)) {
          latestIdea = dashboard.startupIdeas[0] || null;
        } else if (dashboard?.latestStartup) {
          latestIdea = dashboard.latestStartup;
        } else {
          latestIdea = dashboard;
        }

        const normalizedDashboard = normalizeStartupPayload(latestIdea);

        setStartupData((prev) => {
          if (prev && Object.keys(prev).length > 0) {
            return prev;
          }
          return normalizedDashboard || prev;
        });
      } catch (err) {
        console.error('Dashboard load failed:', err);
      } finally {
        setDashboardLoading(false);
      }
    };

    loadDashboard();
  }, [currentUser]);

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthSubmit = async () => {
    if (!canSubmitAuth) {
      setError('Enter both username and password.');
      return;
    }

    setError('');
    setStatusMessage('');
    setAuthLoading(true);

    try {
      let response;

      if (authMode === 'signup') {
        response = await signup(
          credentials.username.trim(),
          credentials.password.trim()
        );
        setStatusMessage('Account created. You can now generate ideas.');
      } else {
        response = await login(
          credentials.username.trim(),
          credentials.password.trim()
        );
        setStatusMessage('Logged in successfully.');
      }

      const user = response?.user || response?.data || response;

      setCurrentUser({
        id: user.id || user.userId,
        username: user.username || credentials.username.trim(),
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGenerateIdea = async () => {
    if (!currentUser?.id) {
      setError('Log in or sign up first to generate a startup idea.');
      return;
    }

    setGenerateLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const response = await generateStartup(currentUser.id);
      const normalizedResponse = normalizeStartupPayload(response);

      if (!normalizedResponse) {
        throw new Error('Normalized response came back empty.');
      }

      setStartupData(normalizedResponse);
      setStatusMessage('A new opportunity was generated from live event data.');
    } catch (err) {
      console.error('GENERATE ERROR:', err);
      setError(err.message || 'Failed to generate startup idea.');
    } finally {
      setGenerateLoading(false);
    }
  };

  const fallbackData = {
    disasterTitle: 'Recent live event signal will appear here',
    disasterDescription:
      'Your backend-generated weather, disaster, or community-impact event will fill this card.',
    insight: 'The AI insight from the live event will show here after generation.',
    title: 'Your startup opportunity will appear here',
    description:
      'The generated business concept from your backend will show here.',
    opportunityScore: 92,
    whyItWorks:
      'This explains why the idea is practical, timely, and useful in a real-world situation.',
    source: 'Live event/API source',
    publishedAt: '',
    impactLevel: 'MEDIUM',
    scoreText: 'MEDIUM impact opportunity',
  };

  const displayData =
    startupData && Object.keys(startupData).length > 0
      ? startupData
      : fallbackData;

  const impactClass =
    displayData?.impactLevel?.toLowerCase() === 'high'
      ? 'high-impact'
      : 'medium-impact';

  return (
    <div className={`app-shell ${impactClass}`}>
      <Header appTitle="Disaster → Opportunity Engine" user={currentUser} />

      <main className="page-content">
        <HeroSection
          authMode={authMode}
          setAuthMode={setAuthMode}
          credentials={credentials}
          onCredentialChange={handleCredentialChange}
          onAuthSubmit={handleAuthSubmit}
          onGenerateIdea={handleGenerateIdea}
          authLoading={authLoading}
          generateLoading={generateLoading}
          dashboardLoading={dashboardLoading}
          canSubmitAuth={canSubmitAuth}
          currentUser={currentUser}
          error={error}
          statusMessage={statusMessage}
        />

        <GenerateStatus active={generateLoading} />

        <h2 className="results-headline">
          Turning live events into practical startup opportunities.
        </h2>

        <section className="cards-grid">
          <div className="reveal-card delay-1">
            <DisasterCard
              title={displayData.disasterTitle}
              description={displayData.disasterDescription}
              source={displayData.source}
              publishedAt={displayData.publishedAt}
            />
          </div>

          <div className="reveal-card delay-2">
            <InsightCard insight={displayData.insight} />
          </div>

          <div className="reveal-card delay-3">
            <OpportunityCard
              title={displayData.title}
              description={displayData.description}
              id={displayData.id}
            />
          </div>

          <div className="reveal-card delay-4">
            <WhyItWorksCard whyItWorks={displayData.whyItWorks} />
          </div>

          <div className="reveal-card delay-5">
            <ScoreCard
              score={displayData.opportunityScore}
              impactLevel={displayData.impactLevel}
              scoreText={displayData.scoreText}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
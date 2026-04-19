import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/ui/Header';
import HeroSection from './components/ui/HeroSection';
import DisasterCard from './components/ui/DisasterCard';
import InsightCard from './components/ui/InsightCard';
import OpportunityCard from './components/ui/OpportunityCard';
import WhyItWorksCard from './components/ui/WhyItWorksCard';
import ScoreCard from './components/ui/ScoreCard';
import {
  login,
  signup,
  generateStartup,
  getDashboard,
  normalizeStartupPayload,
} from './services/api';

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
        console.log('DASHBOARD RESPONSE:', dashboard);
        console.log('NORMALIZED DASHBOARD:', normalizedDashboard);

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
      console.log('GENERATE RESPONSE:', response);

      const normalizedResponse = normalizeStartupPayload(response);
      console.log('NORMALIZED RESPONSE:', normalizedResponse);

      if (!normalizedResponse) {
        throw new Error('Normalized response came back empty.');
      }

      setStartupData(() => normalizedResponse);
      setStatusMessage('Winning idea generated from live backend data.');
    } catch (err) {
      console.error('GENERATE ERROR:', err);
      setError(err.message || 'Failed to generate startup idea.');
    } finally {
      setGenerateLoading(false);
    }
  };

  const fallbackData = {
    disasterTitle: 'Recent disaster signal will appear here',
    disasterDescription:
      'Your backend-generated disaster/news event will fill this card.',
    insight: 'The AI insight from the event will show here after generation.',
    title: 'Your startup opportunity will appear here',
    description:
      'The generated business concept from your Spring Boot backend will show here.',
    opportunityScore: 92,
    whyItWorks:
      'This card explains why the idea is practical, urgent, and compelling to hackathon judges.',
    source: 'News/API source',
    publishedAt: '',
  };

  console.log('RAW startupData state:', startupData);

  const displayData =
    startupData && Object.keys(startupData).length > 0
      ? startupData
      : fallbackData;

  console.log('DISPLAY DATA USED:', displayData);

  return (
    <div className="app-shell">
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

        <section className="cards-grid">
  <DisasterCard
    title={displayData.disasterTitle}
    description={displayData.disasterDescription}
    source={displayData.source}
    publishedAt={displayData.publishedAt}
  />

  <InsightCard insight={displayData.insight} />

  <OpportunityCard
    title={displayData.title}
    description={displayData.description}
    id={displayData.id}
  />

  <WhyItWorksCard whyItWorks={displayData.whyItWorks} />

  <ScoreCard
  score={displayData.opportunityScore}
  impactLevel={displayData.impactLevel}
  scoreText={displayData.scoreText}
/>
</section>
      </main>
    </div>
  );
}
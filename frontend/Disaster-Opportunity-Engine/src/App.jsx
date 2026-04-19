import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateStartupPage from './pages/CreateStartupPage';
import ViewStartupPage from './pages/ViewStartupPage';
import EditStartupPage from './pages/EditStartupPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/startups/new" element={<CreateStartupPage />} />
      <Route path="/startups/:id" element={<ViewStartupPage />} />
      <Route path="/startups/:id/edit" element={<EditStartupPage />} />
    </Routes>
  );
};

export default App;
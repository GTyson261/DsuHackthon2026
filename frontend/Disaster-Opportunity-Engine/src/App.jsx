import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSignupPage from './components/pages/LoginSignupPage';
import DashboardPage from './components/pages/DashboardPage';
import CreateStartupPage from './components/pages/CreateStartupPage';
import ViewStartupPage from './components/pages/ViewStartupPage';
import EditStartupPage from './components/pages/EditStartupPage';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  setIsLoggedIn(false);
};

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginSignupPage setIsLoggedIn={handleLogin} />}
      />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <DashboardPage onLogout={handleLogout} />
    </ProtectedRoute>
  }
/>
      <Route
        path="/startups/new"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CreateStartupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/startups/:id"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ViewStartupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/startups/:id/edit"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <EditStartupPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
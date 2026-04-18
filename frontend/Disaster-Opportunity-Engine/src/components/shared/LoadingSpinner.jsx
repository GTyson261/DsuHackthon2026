import React from 'react';

const LoadingSpinner = ({ message = 'Loading, please wait...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
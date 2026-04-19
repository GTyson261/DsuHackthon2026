import React from 'react';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="error-message-container">
      <p className="error-text">{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
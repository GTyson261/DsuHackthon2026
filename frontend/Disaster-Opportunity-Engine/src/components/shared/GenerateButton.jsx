import React from 'react';

const GenerateButton = ({ onClick, isLoading, text = 'Generate Opportunities' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="generate-button"
    >
      {isLoading ? 'Generating...' : text}
    </button>
  );
};

export default GenerateButton;
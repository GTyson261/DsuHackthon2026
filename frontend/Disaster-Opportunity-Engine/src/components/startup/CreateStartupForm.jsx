import React, { useState } from 'react';
import GenerateButton from '../shared/GenerateButton.jsx';
import ErrorMessage from '../shared/ErrorMessage.jsx';

const CreateStartupForm = ({ onSubmitStartup, isLoading = false, error = '' }) => {
  const [formData, setFormData] = useState({
    disaster: '',
    industry: '',
    location: '',
    details: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = () => {
    if (!formData.disaster.trim() || !formData.industry.trim()) {
      return;
    }

    onSubmitStartup(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <form className="create-startup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="disaster">Disaster / Problem</label>
        <input
          type="text"
          id="disaster"
          name="disaster"
          value={formData.disaster}
          onChange={handleChange}
          placeholder="Enter a disaster or major problem"
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Enter a target industry"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter a location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">Details</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Add more context about the problem"
          rows="4"
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <GenerateButton
        text="Generate Startup Opportunity"
        onClick={submitForm}
        isLoading={isLoading}
      />
    </form>
  );
};

export default CreateStartupForm;
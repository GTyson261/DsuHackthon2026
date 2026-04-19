import React, { useEffect, useState } from 'react';
import ErrorMessage from "../components/shared/ErrorMessage.jsx";
import GenerateButton from '../components/shared/GenerateButton.jsx';

const EditStartupForm = ({
  startup,
  onSaveStartup,
  isLoading = false,
  error = '',
}) => {
  const [formData, setFormData] = useState({
    title: '',
    problem: '',
    solution: '',
    details: '',
  });

  useEffect(() => {
    if (startup) {
      setFormData({
        title: startup.title || '',
        problem: startup.problem || '',
        solution: startup.solution || '',
        details: startup.details || '',
      });
    }
  }, [startup]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.problem.trim()) {
      return;
    }

    onSaveStartup({
      ...startup,
      ...formData,
    });
  };

  if (!startup) {
    return <p>No startup data available to edit.</p>;
  }

  return (
    <form className="edit-startup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Startup Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter startup title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="problem">Problem</label>
        <textarea
          id="problem"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          placeholder="Describe the problem"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="solution">Solution</label>
        <textarea
          id="solution"
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          placeholder="Describe the solution"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">Details</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Add more details"
          rows="4"
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        className="save-startup-button"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditStartupForm;
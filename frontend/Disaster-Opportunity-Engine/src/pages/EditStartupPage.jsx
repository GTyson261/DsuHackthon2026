import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditStartupForm from '../startup/EditStartupForm.jsx';

const mockStartups = [
  {
    id: 1,
    title: 'Flood Recovery Network',
    problem: 'Communities affected by flooding struggle with recovery coordination.',
    solution: 'A platform for response coordination, resource tracking, and recovery planning.',
    details: 'Focused on local governments, nonprofits, and affected residents.',
  },
  {
    id: 2,
    title: 'Power Grid Alert Hub',
    problem: 'Power outages slow emergency response and disrupt daily life.',
    solution: 'A real-time outage communication and emergency coordination platform.',
    details: 'Focused on utilities, municipalities, and emergency teams.',
  },
  {
    id: 3,
    title: 'Wildfire Shelter Match',
    problem: 'Displaced families struggle to find temporary shelter quickly.',
    solution: 'A matching system connecting evacuees with safe shelter and support resources.',
    details: 'Focused on evacuation zones and community partnerships.',
  },
];

const EditStartupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const startupToEdit = mockStartups.find((item) => String(item.id) === String(id));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveStartup = (updatedStartup) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      try {
        console.log('Updated startup:', updatedStartup);
        navigate(`/startups/${updatedStartup.id}`);
      } catch (err) {
        setError('Failed to save startup changes.');
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <section className="edit-startup-page">
      <div className="edit-startup-page-header">
        <h1>Edit Startup Opportunity</h1>
        <p>Update the startup details and save your changes.</p>
      </div>

      <EditStartupForm
        startup={startupToEdit}
        onSaveStartup={handleSaveStartup}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

export default EditStartupPage;
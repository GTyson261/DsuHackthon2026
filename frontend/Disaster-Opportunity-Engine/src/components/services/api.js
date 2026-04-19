const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const createStartup = async (startupData) => {
  const response = await fetch(`${API_BASE_URL}/startups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(startupData),
  });

  if (!response.ok) {
    throw new Error('Failed to create startup.');
  }

  return response.json();
};

export const getAllStartups = async () => {
  const response = await fetch(`${API_BASE_URL}/startups`);

  if (!response.ok) {
    throw new Error('Failed to fetch startups.');
  }

  return response.json();
};

export const getStartupById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/startups/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch startup details.');
  }

  return response.json();
};

export const updateStartup = async (id, updatedStartup) => {
  const response = await fetch(`${API_BASE_URL}/startups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedStartup),
  });

  if (!response.ok) {
    throw new Error('Failed to update startup.');
  }

  return response.json();
};
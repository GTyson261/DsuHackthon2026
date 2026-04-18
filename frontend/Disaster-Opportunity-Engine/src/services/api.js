const BASE_URL = 'http://localhost:8080/api';

export const generateOpportunities = async () => {
  const response = await fetch(`${BASE_URL}/generate`);

  if (!response.ok) {
    throw new Error('Failed to generate opportunities.');
  }

  return response.json();
};
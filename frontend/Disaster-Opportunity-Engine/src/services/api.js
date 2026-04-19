const API_BASE_URL = 'http://localhost:8080/api';

export const loginUser = async (userData) => {
  console.log('Mock login request:', userData);
  return { success: true };
};

export const signupUser = async (userData) => {
  console.log('Mock signup request:', userData);
  return { success: true };
};

export const createStartup = async (startupData) => {
  console.log('Mock create startup request:', startupData);
  return {
    id: Date.now(),
    ...startupData,
  };
};

export const getAllStartups = async () => {
  console.log('Mock get all startups request');
  return [];
};

export const getStartupById = async (id) => {
  console.log('Mock get startup by id request:', id);
  return null;
};

export const updateStartup = async (id, updatedData) => {
  console.log('Mock update startup request:', id, updatedData);
  return {
    id,
    ...updatedData,
  };
};
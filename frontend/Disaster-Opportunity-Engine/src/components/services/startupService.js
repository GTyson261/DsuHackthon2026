import {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
} from './api.js';

import {
  addStoredStartup,
  clearStoredStartups,
  deleteStoredStartup,
  getStoredStartupById,
  getStoredStartups,
  updateStoredStartup,
} from './startupStorage.js';

const calculateStartupScores = (formData) => {
  let urgencyScore = 5;
  let marketScore = 5;
  let feasibilityScore = 5;
  let impactScore = 5;

  const disasterText = `${formData.disaster} ${formData.details}`.toLowerCase();
  const industryText = `${formData.industry}`.toLowerCase();

  if (
    disasterText.includes('tornado') ||
    disasterText.includes('flood') ||
    disasterText.includes('fire') ||
    disasterText.includes('wildfire') ||
    disasterText.includes('earthquake')
  ) {
    urgencyScore += 3;
    impactScore += 2;
  }

  if (
    industryText.includes('health') ||
    industryText.includes('housing') ||
    industryText.includes('restaurant') ||
    industryText.includes('transport') ||
    industryText.includes('energy')
  ) {
    marketScore += 2;
  }

  if (
    disasterText.includes('coordination') ||
    disasterText.includes('tracking') ||
    disasterText.includes('planning')
  ) {
    feasibilityScore += 1;
  }

  urgencyScore = Math.min(10, urgencyScore);
  marketScore = Math.min(10, marketScore);
  feasibilityScore = Math.min(10, feasibilityScore);
  impactScore = Math.min(10, impactScore);

  const totalScore =
    urgencyScore + marketScore + feasibilityScore + impactScore;

  return {
    urgencyScore,
    marketScore,
    feasibilityScore,
    impactScore,
    totalScore,
  };
};

export const buildStartupPayload = (formData) => {
  const scores = calculateStartupScores(formData);

  return {
    id: Date.now(),
    title: `${formData.disaster} Recovery Network`,
    problem: `Communities affected by ${formData.disaster} struggle with recovery coordination.`,
    solution: `A startup platform serving the ${formData.industry} sector in ${
      formData.location || 'target regions'
    } by offering response coordination, resource tracking, and recovery planning tools.`,
    details: formData.details || 'No additional details provided.',
    location: formData.location || '',
    industry: formData.industry || '',
    disaster: formData.disaster || '',
    ...scores,
  };
};

export const createStartupRecord = async (formData) => {
  const startupPayload = buildStartupPayload(formData);

  try {
    const savedStartup = await createStartup(startupPayload);
    addStoredStartup(savedStartup);
    return {
      startup: savedStartup,
      mode: 'api',
    };
  } catch (error) {
    addStoredStartup(startupPayload);
    return {
      startup: startupPayload,
      mode: 'local',
    };
  }
};

export const getStartupRecords = async () => {
  try {
    const startups = await getAllStartups();
    return startups;
  } catch (error) {
    return getStoredStartups();
  }
};

export const getStartupRecordById = async (id) => {
  try {
    return await getStartupById(id);
  } catch (error) {
    return getStoredStartupById(id);
  }
};

export const updateStartupRecord = async (id, updatedStartup) => {
  try {
    const savedStartup = await updateStartup(id, updatedStartup);
    updateStoredStartup(id, savedStartup);
    return savedStartup;
  } catch (error) {
    updateStoredStartup(id, updatedStartup);
    return updatedStartup;
  }
};

export const deleteStartupRecord = async (id) => {
  deleteStoredStartup(id);
};

export const clearStartupRecords = () => {
  clearStoredStartups();
};
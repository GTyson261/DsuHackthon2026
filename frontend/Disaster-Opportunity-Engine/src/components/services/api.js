const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const getStartupStorageKey = () => {
  const currentUser = localStorage.getItem('currentUser') || 'guest';
  return `startups_${currentUser}`;
};

// CREATE STARTUP
export const createStartup = async (startupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(startupData),
    });

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    return {
      id: Date.now(),
      ...startupData,
    };
  }
};

// GET ALL STARTUPS
export const getAllStartups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups`);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    const storageKey = getStartupStorageKey();
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }
};

// GET STARTUP BY ID
export const getStartupRecordById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups/${id}`);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    const storageKey = getStartupStorageKey();
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    return stored.find((s) => String(s.id) === String(id)) || null;
  }
};

// UPDATE STARTUP
export const updateStartupRecord = async (id, updatedStartup) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStartup),
    });

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    const storageKey = getStartupStorageKey();
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];

    const updated = stored.map((s) =>
      String(s.id) === String(id) ? updatedStartup : s
    );

    localStorage.setItem(storageKey, JSON.stringify(updated));
    return updatedStartup;
  }
};

// DELETE STARTUP
export const deleteStartupRecord = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/startups/${id}`, {
      method: 'DELETE',
    });
  } catch {
    const storageKey = getStartupStorageKey();
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updated = stored.filter((s) => String(s.id) !== String(id));
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }
};

// CLEAR ALL STARTUPS
export const clearAllStartupRecords = () => {
  const storageKey = getStartupStorageKey();
  localStorage.removeItem(storageKey);
};
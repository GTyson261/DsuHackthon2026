const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';


  //CREATE STARTUP//

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


 //GET ALL STARTUPS//
 
export const getAllStartups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups`);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    return JSON.parse(localStorage.getItem('startups')) || [];
  }
};


  //Get Startup by ID//

export const getStartupRecordById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups/${id}`);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch {
    const stored = JSON.parse(localStorage.getItem('startups')) || [];
    return stored.find((s) => String(s.id) === String(id)) || null;
  }
};


  //Update Startup//
 
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
    const stored = JSON.parse(localStorage.getItem('startups')) || [];

    const updated = stored.map((s) =>
      String(s.id) === String(id) ? updatedStartup : s
    );

    localStorage.setItem('startups', JSON.stringify(updated));
    return updatedStartup;
  }
};


 //Delete Startup//

export const deleteStartupRecord = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/startups/${id}`, {
      method: 'DELETE',
    });
  } catch {
    const stored = JSON.parse(localStorage.getItem('startups')) || [];
    const updated = stored.filter((s) => String(s.id) !== String(id));
    localStorage.setItem('startups', JSON.stringify(updated));
  }
};

//Clear All Startup//

export const clearAllStartupRecords = () => {
  localStorage.removeItem('startups');
};
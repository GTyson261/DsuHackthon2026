const STORAGE_KEY = 'startups';

export const getStoredStartups = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveStoredStartups = (startups) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(startups));
};

export const addStoredStartup = (startup) => {
  const startups = getStoredStartups();
  const updatedStartups = [startup, ...startups];
  saveStoredStartups(updatedStartups);
  return startup;
};

export const getStoredStartupById = (id) => {
  const startups = getStoredStartups();
  return startups.find((startup) => String(startup.id) === String(id)) || null;
};

export const updateStoredStartup = (id, updatedStartup) => {
  const startups = getStoredStartups();

  const updatedStartups = startups.map((startup) =>
    String(startup.id) === String(id) ? updatedStartup : startup
  );

  saveStoredStartups(updatedStartups);
  return updatedStartup;
};

export const deleteStoredStartup = (id) => {
  const startups = getStoredStartups();

  const updatedStartups = startups.filter(
    (startup) => String(startup.id) !== String(id)
  );

  saveStoredStartups(updatedStartups);
};

export const clearStoredStartups = () => {
  localStorage.removeItem(STORAGE_KEY);
};
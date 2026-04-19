const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data
        : data?.message || data?.error || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export async function signup(username, password) {
  const params = new URLSearchParams({ username, password });
  return request(`/auth/signup?${params.toString()}`, {
    method: 'POST',
  });
}

export async function login(username, password) {
  const params = new URLSearchParams({ username, password });
  return request(`/auth/login?${params.toString()}`, {
    method: 'POST',
  });
}

export async function generateStartup(userId) {
  return request(`/startups/generate?userId=${encodeURIComponent(userId)}`, {
    method: 'POST',
  });
}

export async function getDashboard(userId) {
  return request(`/dashboard/${encodeURIComponent(userId)}`);
}

export async function getStartupById(id) {
  return request(`/startups/${encodeURIComponent(id)}`);
}

export async function updateStartup(id, payload) {
  return request(`/startups/edit/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteStartup(id) {
  return request(`/startups/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/**
 * Makes frontend stable even if backend field names vary a little.
 */
export function normalizeStartupPayload(raw) {
  if (!raw) return null;

  const startup =
    raw.startupIdea ||
    raw.startup ||
    raw.idea ||
    raw.data ||
    raw;

  const news =
    raw.news ||
    raw.article ||
    startup.news ||
    null;

  const title =
    startup.title ||
    startup.startupTitle ||
    startup.ideaTitle ||
    'Generated Startup Idea';

  const description =
    startup.description ||
    startup.ideaDescription ||
    startup.summary ||
    'No description returned yet.';

  const disasterTitle =
    news?.title ||
    raw.disasterTitle ||
    startup.disasterTitle ||
    'Live problem signal';

  const disasterDescription =
    news?.description ||
    raw.disasterDescription ||
    startup.disasterDescription ||
    'A real-world disruption created the opportunity.';

  const source =
    news?.source ||
    news?.sourceName ||
    raw.source ||
    'News feed';

  const publishedAt =
    news?.publishedAt ||
    raw.publishedAt ||
    startup.publishedAt ||
    '';

  const opportunityScore =
    startup.score ||
    startup.opportunityScore ||
    raw.score ||
    92;

  const whyItWorks =
    startup.whyItWorks ||
    raw.whyItWorks ||
    'This idea solves a visible real-world problem, has a clear user need, and feels demo-ready for judges.';

  const insight =
    startup.insight ||
    raw.insight ||
    'A disruption creates urgency. Urgency creates demand. Demand creates room for a focused startup.';

  return {
    id: startup.id || raw.id || null,
    title,
    description,
    disasterTitle,
    disasterDescription,
    source,
    publishedAt,
    opportunityScore,
    whyItWorks,
    insight,
    raw,
  };
}
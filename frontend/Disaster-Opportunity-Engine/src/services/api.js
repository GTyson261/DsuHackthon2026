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

  let data = null;

  if (response.status !== 204) {
    data = isJson ? await response.json() : await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data
        : data?.message || data?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

// AUTH
export async function signup(username, password) {
  const params = new URLSearchParams({ username, password });
  return request(`/auth/signup?${params.toString()}`, { method: 'POST' });
}

export async function login(username, password) {
  const params = new URLSearchParams({ username, password });
  return request(`/auth/login?${params.toString()}`, { method: 'POST' });
}

// STARTUP
export async function generateStartup(userId) {
  return request(`/startups/generate?userId=${encodeURIComponent(userId)}`, {
    method: 'POST',
  });
}

export async function getDashboard(userId) {
  return request(`/dashboard/${encodeURIComponent(userId)}`);
}

// SCORE ENGINE 🔥
function calculateScore(problem, solution) {
  let score = 70;

  if (problem) {
    const urgencyKeywords = [
      'crisis',
      'emergency',
      'disaster',
      'danger',
      'flood',
      'storm',
      'hurricane',
      'tornado',
      'wildfire',
      'earthquake',
      'heatwave',
      'drought',
      'blizzard',
      'landslide',
      'evacuation',
      'outbreak',
    ];

    urgencyKeywords.forEach((word) => {
      if (problem.toLowerCase().includes(word)) score += 4;
    });
  }

  if (solution) {
    const strongFeatures = [
      'real-time',
      'alerts',
      'ai',
      'automation',
      'platform',
      'prediction',
      'monitoring',
      'response',
      'recovery',
      'coordination',
    ];

    strongFeatures.forEach((word) => {
      if (solution.toLowerCase().includes(word)) score += 3;
    });
  }

  return Math.min(score, 98);
}
// NORMALIZER
export function normalizeStartupPayload(raw) {
  if (!raw) return null;

  const impactLevel =
    raw.impactLevel || (raw.problem?.length > 120 ? 'HIGH' : 'MEDIUM');

  return {
    id: raw.ideaId || raw.id || null,
    title: raw.startupTitle || 'Generated Startup Idea',
    description: raw.startupDescription || '',
    disasterTitle: raw.sourceNewsTitle || '',
    disasterDescription: raw.problem || '',
    insight: raw.solution || '',
    whyItWorks:
      raw.solution
        ? `This is a ${impactLevel.toLowerCase()}-impact idea solving a real-world crisis.`
        : '',
    opportunityScore: calculateScore(raw.problem, raw.solution),
    impactLevel,
    scoreText: `${impactLevel} impact opportunity`,
    source: 'Disaster → Opportunity Engine',
    publishedAt: '',
    raw,
  };
}
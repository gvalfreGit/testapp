const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'Erro na requisição.');
  }

  return response.json();
}

export const api = {
  getFamilies: () => request('/families'),
  createFamily: (data) => request('/families', { method: 'POST', body: JSON.stringify(data) }),
  getMembers: (familyId) => request(`/families/${familyId}/members`),
  createMember: (familyId, data) =>
    request(`/families/${familyId}/members`, { method: 'POST', body: JSON.stringify(data) }),
  getEvents: (familyId) => request(`/families/${familyId}/events`),
  createEvent: (familyId, data) =>
    request(`/families/${familyId}/events`, { method: 'POST', body: JSON.stringify(data) }),
  getTasks: (familyId) => request(`/families/${familyId}/tasks`),
  createTask: (familyId, data) =>
    request(`/families/${familyId}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  updateTaskStatus: (taskId, status) =>
    request(`/tasks/${taskId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

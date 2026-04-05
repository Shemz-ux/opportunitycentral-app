const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
      window.location.href = '/admin/login';
      throw new Error('Session expired. Please login again.');
    }

    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export { API_BASE_URL, apiFetch };

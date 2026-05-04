// Central API helper for all backend calls.
// Reads VITE_API_URL from environment, falls back to localhost for dev.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to make requests with credentials (cookies) and JSON
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // send cookies
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to reach the server. Please check your connection.');
    }
    throw error;
  }
};

// ---- Auth ----
export const registerUser = (payload) =>
  request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const loginUser = (payload) =>
  request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const logoutUser = () =>
  request('/api/auth/logout', { method: 'POST' });

export const getProfile = () => request('/api/auth/profile');

// ---- Crypto ----
export const fetchAllCryptos = () => request('/api/crypto');
export const fetchTopGainers = () => request('/api/crypto/gainers');
export const fetchNewListings = () => request('/api/crypto/new');

export const addCrypto = (payload) =>
  request('/api/crypto', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export default {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  fetchAllCryptos,
  fetchTopGainers,
  fetchNewListings,
  addCrypto,
};

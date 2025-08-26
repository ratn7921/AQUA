// src/api/index.js
import axios from 'axios';

// allow explicit full base (e.g. https://api.example.com) via Vite env, otherwise same-origin
const baseURL = import.meta.env.VITE_API_BASE_URL ?? '';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Normalize request URLs:
// - Ignore absolute URLs (http/https).
// - Ensure a single leading "/api" prefix for same-origin routes.
// - Collapse accidental "/api/api" to "/api".
api.interceptors.request.use(config => {
  try {
    const url = config.url || '';
    if (!/^https?:\/\//i.test(url)) {
      // make sure it begins with a slash
      let normalized = url.startsWith('/') ? url : `/${url}`;
      // collapse consecutive /api prefixes: /apiapi... or /api/api/... -> /api/...
      normalized = normalized.replace(/^(\/api)+(?=\/|$)/, '/api');
      // if it doesn't start with /api, add it
      if (!/^\/api(\/|$)/.test(normalized)) {
        normalized = `/api${normalized}`;
      }
      config.url = normalized;
    }
  } catch (err) {
    // leave config.url as-is on any error
  }
  return config;
}, err => Promise.reject(err));

export default api;
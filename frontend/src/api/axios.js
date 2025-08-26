// src/api/index.js
import axios from 'axios';

// Use an explicit Vite env var if provided, otherwise use same-origin (empty string).
// This prevents accidental double "/api" when code calls "/api/..." already.
const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''; 

const api = axios.create({
  baseURL,
  withCredentials: true,
  // ...other defaults...
});

export default api;


//
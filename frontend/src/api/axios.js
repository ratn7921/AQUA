// src/api/index.js
import axios from 'axios'

// Use Vite env var VITE_API_URL if set, otherwise use same origin (relative)
const baseURL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL,
  // optionally set defaults:
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
})

export default api
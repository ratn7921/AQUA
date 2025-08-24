// src/api/index.js
import axios from 'axios'

// Use Vite env var VITE_API_URL if set, otherwise default to same-origin API prefix
// In Render leave VITE_API_URL unset (uses '/api'), for local dev set VITE_API_URL=http://localhost:5000
const baseURL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL,
  withCredentials: false
})

export default api
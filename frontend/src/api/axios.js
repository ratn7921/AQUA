// src/api/index.js
import axios from 'axios'

// Use Vite env var if provided; otherwise default to /api so calls like "/auth/login" map to "/api/auth/login"
const baseURL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL,
  withCredentials: false
})

export default api
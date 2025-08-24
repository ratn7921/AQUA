// src/api/index.js
import axios from 'axios'

// Use Vite env var if provided; otherwise same-origin root
const baseURL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL,
  withCredentials: false
})

export default api
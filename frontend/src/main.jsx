import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App.jsx'

// Only use the Render backend when deployed to Vercel (production mode)
if (import.meta.env.MODE === 'production') {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://backend-with-mongo.onrender.com';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

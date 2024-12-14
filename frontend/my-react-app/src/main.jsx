import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';  // Tailwind utilities and root-level styles
//import './App.css';    // Component-level and layout-specific styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

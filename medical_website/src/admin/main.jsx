import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouteAdmin from '../AppRouteAdmin.jsx'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouteAdmin />
  </StrictMode>, 
)

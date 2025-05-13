import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { createRoot } from 'react-dom/client';
import AppRouteAdmin from './Routes/AppRouteAdmin.jsx'; // Đảm bảo đường dẫn đúng
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* Bao bọc AppRouteAdmin bằng BrowserRouter */}
      <AppRouteAdmin />
    </BrowserRouter>
  </StrictMode>
);

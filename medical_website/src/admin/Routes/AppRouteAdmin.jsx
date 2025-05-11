import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../pages/Layout";
import DashboardPage from "../pages/dashboard"; // Ensure you import the DashboardPage component
// Import other necessary pages like DoctorManagementPage, etc.


export default function AppRouteAdmin() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        {/* Define the dashboard route */}
        <Route path="dashboard" element={<DashboardPage />} />
        
    
      </Route>
    </Routes>

  );
}

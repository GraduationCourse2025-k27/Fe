import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../pages/Layout";
export default function AppRouteAdmin() {
  return (
  
      <Routes>
        <Route path="/admin" element={<Layout />}>
          {/* <Route path="dashboard" element={<DashboardPage />} />
          <Route path="doctor-management" element={<DoctorManagementPage />} />
          <Route
            path="specialization-management"
            element={<SpecializationManagementPage />}
          />
          <Route path="medical-records" element={<MedicalRecordsPage />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="profile-management" element={<ProfileManagement />} />
          <Route
            path="appointment-management"
            element={<AppointmentManagement />}
          /> */}
        </Route>
      </Routes>
  );
}

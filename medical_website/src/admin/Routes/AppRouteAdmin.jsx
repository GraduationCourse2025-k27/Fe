import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../pages/Layout";

import DashboardPage from "../pages/dashboard"; 
import DoctorManagementPage from "../pages/doctor-management"; 
import AppointmentManagement from "../pages/appointment-management"; 
import ServiceManagement from "../pages/service-management"; 
import MedicalRecordsPage from "../pages/medical-records"; 
import SpecializationManagementPage from "../pages/specialization-management"; 
import ProfileManagement from "../pages/profile-management"; 
import ArticleManagement from "../pages/article-management";


export default function AppRouteAdmin() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="doctor-management" element={<DoctorManagementPage />} />
        <Route path="appointment-management" element={<AppointmentManagement />} />
        <Route path="service-management" element={<ServiceManagement />} />
        <Route path="medical-records" element={<MedicalRecordsPage />} />
        <Route path="specialization-management" element={<SpecializationManagementPage />} />
        <Route path="profile-management" element={<ProfileManagement />} />
        <Route path="article-management" element={<ArticleManagement/>} />

      </Route>
    </Routes>

  );
}

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DoctorSchedule from "../pages/doctor-schedule";
import LayoutDoctor from "../pages/LayoutDoctor";
import MedicalRecordsPage from "../pages/medical-records";

export default function AppRouteDoctor() {
  const role = localStorage.getItem("ROLE");
  if (role !== "ROLE_DOCTOR") {
    return <Navigate to="/" replace />;
  }
  return (
    <Routes>
      <Route path="/doctor" element={<LayoutDoctor />}>
        <Route path="doctor-schedule" element={<DoctorSchedule />} />
        <Route path="medical-records" element={<MedicalRecordsPage />} />
      </Route>
    </Routes>
  );
}

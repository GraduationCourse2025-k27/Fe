import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppointmentManagement from "../pages/appointment-management";
import ArticleManagement from "../pages/article-management";
import { LayoutStaff } from "../pages/LayoutStaff";

export default function AppRouteStaff() {
  const role = localStorage.getItem("ROLE");
  if (role !== "ROLE_STAFF") {
    return <Navigate to="/" replace />;
  }
  return (
    <Routes>
      <Route path="/staff" element={<LayoutStaff />}>
        <Route
          path="appointment-management"
          element={<AppointmentManagement />}
        />
        <Route path="article-management" element={<ArticleManagement />} />
      </Route>
    </Routes>
  );
}

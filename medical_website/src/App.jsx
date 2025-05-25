import { a } from "@react-spring/web";
import AppAdmin from "./admin/Routes/AppAdmin";
import ScrollToTop from "./components/ScrollToTop";
import AppRouter from "./routes/AppRouter";
import { Navigate } from "react-router-dom";
import { AuthForm } from "./auth/authForm";
import { useEffect, useState } from "react";
import AppRouteAdmin from "./admin/Routes/AppRouteAdmin";
import AppRouteDoctor from "./admin/Routes/AppRouteDoctor";
import AppRouteStaff from "./admin/Routes/AppRouteStaff";

function App() {
  const role = localStorage.getItem("ROLE");

  if (role === "ROLE_ADMIN") {
    return (
      <div>
        <ScrollToTop />
        <AppRouteAdmin />
      </div>
    );
  } else if (role === "ROLE_DOCTOR") {
    return (
      <div>
        <ScrollToTop />
        <AppRouteDoctor />
      </div>
    );
  } else if (role === "ROLE_STAFF") {
    return (
      <div>
        <ScrollToTop />
        <AppRouteStaff />
      </div>
    );
  } else {
    return (
      <div>
        <ScrollToTop />
        <AppRouter />
      </div>
    );
  }
}

export default App;

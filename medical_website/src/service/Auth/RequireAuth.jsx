import React, { useState } from "react";
import { AuthForm } from "../../auth/authForm";

export default function RequireAuth({ children }) {
  const user = localStorage.getItem("jwt");
  const [isShowLogin, setIsShowLogin] = useState(true);
  const handleCLoseLogin = () => setIsShowLogin(false);
  if (!user) {
    return <AuthForm showModal={isShowLogin} handleClose={handleCLoseLogin} />;
  }
  return children;
}

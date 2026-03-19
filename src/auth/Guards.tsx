import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// מגן על עמודים שדורשים התחברות
export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn = useSelector((state: RootState) => state.app.loggedIn);
  if (!loggedIn) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

// מונע ממשתמש מחובר להיכנס לדף ההתחברות
export const LoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn = useSelector((state: RootState) => state.app.loggedIn);
  if (loggedIn) return <Navigate to="/events" replace />;
  return <>{children}</>;
};
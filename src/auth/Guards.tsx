import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../App";

// ─────────────────────────────────────────────
// AuthGuard
// מגן על עמודים שדורשים התחברות.
// אם המשתמש לא מחובר — מפנה ל-/auth
// ─────────────────────────────────────────────
export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loggedIn } = useAppContext();
  if (!loggedIn) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

// ─────────────────────────────────────────────
// LoginGuard
// מגן על דף ההתחברות.
// אם המשתמש כבר מחובר — מפנה ל-/events
// ─────────────────────────────────────────────
export const LoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loggedIn } = useAppContext();
  if (loggedIn) return <Navigate to="/events" replace />;
  return <>{children}</>;
};

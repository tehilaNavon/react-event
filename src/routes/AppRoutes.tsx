import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthGuard, LoginGuard } from "../auth/Guards";
import { EventsPageWrapper, EventDetailPageWrapper, VendorsPageWrapper, TasksPageWrapper } from "./Wrappers";
import AuthPage from "../pages/AuthPage";

const router = createBrowserRouter([
  // ── Auth ──────────────────────────────────────────────
  // /auth         — דף ראשי עם LoginPage
  // /auth/register — RegisterPage
  // /auth/forgot   — שכחתי סיסמה (בתוך LoginPage)
  // כולם מוגנים ע"י LoginGuard — מחובר? ← חזרה ל-/events
  {
    path: "/auth",
    element: <LoginGuard><AuthPage tab="login" /></LoginGuard>,
  },
  {
    path: "/auth/register",
    element: <LoginGuard><AuthPage tab="register" /></LoginGuard>,
  },

  // ── Protected ──────────────────────────────────────────
  {
    path: "/events",
    element: <AuthGuard><EventsPageWrapper /></AuthGuard>,
  },
  {
    path: "/events/:eventId",
    element: <AuthGuard><EventDetailPageWrapper /></AuthGuard>,
  },
  {
    path: "/events/:eventId/vendors",
    element: <AuthGuard><VendorsPageWrapper /></AuthGuard>,
  },
  {
    path: "/events/:eventId/tasks",
    element: <AuthGuard><TasksPageWrapper /></AuthGuard>,
  },

  // ── Fallback ───────────────────────────────────────────
  {
    path: "*",
    element: <Navigate to="/events" replace />,
  },
]);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;

















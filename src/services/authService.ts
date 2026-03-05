import type { UserWithID } from "../types/user";

// const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
const BASE_URL = "https://localhost:7067/api";
// ── Types ────────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  UserName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  // userID: number;
  // userName: string;
  // userEmail: string;
  // userPhone: string;
  // role: number;
  user: UserWithID; // הוספתי את זה כדי לקבל את כל פרטי המשתמש בבת אחת
}

// ── Helpers ──────────────────────────────────────────────
const post = async <T>(endpoint: string, body: object): Promise<T> => {
  console.log(`POST ${endpoint} with`, body);
  console.log(`Using API URL: ${BASE_URL}`); // Debug log for API URL
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong");
  }
  return data as T;
};

// ── Auth API ─────────────────────────────────────────────
export const loginUser = (
  email: string,
  password: string,
): Promise<AuthResponse> =>
  post<AuthResponse>("/User/login", {
    UserEmail: email, // ← במקום email
    UserPassword: password, // ← במקום password
  });

export const registerUser = (
  UserName: string,
  userEmail: string,
  userPhone: string,
  userPassword: string,
): Promise<AuthResponse> =>
  post<AuthResponse>("/User", {
    UserName: UserName,
    userEmail: userEmail,
    userPhone: userPhone,
    userPassword: userPassword,
  });

export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ── Token helpers ────────────────────────────────────────
export const getToken = (): string | null => localStorage.getItem("token");

export const isAuthenticated = (): boolean => !!getToken();

// ── Authenticated fetch (for protected routes) ───────────
export const authFetch = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const token = getToken();

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};

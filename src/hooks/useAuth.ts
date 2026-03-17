import { useState, useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  isAuthenticated,
  type AuthResponse,
} from "../services/authService";
import type { UserWithID } from "../types/user";

interface UseAuthReturn {
  user: UserWithID | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// ── Helper: load user from localStorage ─────────────────
const loadUser = (): UserWithID | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as UserWithID) : null;
  } catch {
    return null;
  }
};

// ── Hook ─────────────────────────────────────────────────
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserWithID | null>(loadUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

const saveSession = (data: AuthResponse): void => {
    const userInfo: UserWithID = {
      userName: data?.user?.userName ?? (data as any)?.userName ?? "",
      userEmail: data?.user?.userEmail ?? (data as any)?.userEmail ?? "",
      userID: data?.user?.userID ?? (data as any)?.userID ?? 0,
      userPhone: data?.user?.userPhone ?? (data as any)?.userPhone ?? undefined,
      role: data?.user?.role ?? (data as any)?.role ?? undefined
    };
    console.log("data:", data); 
    console.log("Received user data:", data); 
    console.log("Saving session for user:", userInfo); 
    console.log("Token being saved:", data.token); 
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
    setIsLoggedIn(true);
  };

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError("");
      try {
        const data = await loginUser(email, password);
        console.log("Login response:", data); 
        saveSession(data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      phone: string,
      password: string,
    ): Promise<boolean> => {
      setLoading(true);
      setError("");
      try {
        const data = await registerUser(name, email, phone, password);
        saveSession(data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback((): void => {
    logoutUser();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const clearError = useCallback((): void => setError(""), []);

  return {
    user,
    isLoggedIn,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};

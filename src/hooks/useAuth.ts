import { useState, useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  isAuthenticated,
  type AuthResponse,
} from "../services/authService";
// import type { EventDtoo } from "../types/event";
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
    // const userInfo: UserWithID = { name: data.user?.name ?? "", email: data.user?.email ?? "", userID: data.user?.userID ?? 0, userPhone: data.user?.userPhone ?? undefined, userRole: data.user?.userRole ?? undefined };
     const userInfo: UserWithID = {
      userName: data?.user.userName ?? "",
      userEmail: data?.user.userEmail ?? "",
      userID: data?.user.userID ?? 0,
      userPhone: data?.user.userPhone ?? undefined,
      role: data?.user.role ?? undefined
    };

    console.log("data:", data); // Debug log for the entire response data
    console.log("Received user data:", data); // Debug log for received user data
    console.log("Saving session for user:", userInfo); // Debug log for user info being saved
    console.log("Token being saved:", data.token); // Debug log for token being saved
    localStorage.setItem("token", data.token); // שמירת הטוקן בlocalStorage
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
        console.log("Login response:", data); // Debug log for login response
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

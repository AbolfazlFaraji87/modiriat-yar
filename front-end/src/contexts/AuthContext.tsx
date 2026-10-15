import { useEffect, useState, type ReactNode } from "react";

import type { AuthUser, LoginData } from "../types/auth";
import { getCurrentUser, loginUser, logoutUser } from "../services/auth";
import { AuthContext, type AuthContextType } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("auth_token"),
  );

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    async function verifySession() {
      setIsLoading(true);

      try {
        const currentUser = await getCurrentUser(token!);

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem("auth_token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void verifySession();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login(data: LoginData): Promise<void> {
    const result = await loginUser(data);

    sessionStorage.setItem("auth_token", result.token);
    setUser(result.user);
    setToken(result.token);
  }

  async function logout(): Promise<void> {
    try {
      if (token) {
        await logoutUser(token);
      }
    } finally {
      sessionStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
  }

  async function refreshUser(): Promise<void> {
    if (!token) {
      throw new Error("ابتدا وارد حساب کاربری خود شوید.");
    }

    const currentUser = await getCurrentUser(token);
    setUser(currentUser);
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

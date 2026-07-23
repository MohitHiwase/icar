"use client";

/**
 * Auth Context
 *
 * Provides authentication state (user, loading, error) to the entire app.
 * On mount, attempts to restore the session from stored tokens.
 * Exposes login, register, and logout functions.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  authApi,
  setTokens,
  clearTokens,
  getAccessToken,
  type AuthUser,
  ApiError,
} from "@/lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Restore session on mount
  useEffect(() => {
    const restore = async () => {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await authApi.me();
        setUser(me);
      } catch {
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await authApi.login({ email, password });
        setTokens(data.accessToken, data.refreshToken);
        setUser(data.user);
        router.push("/");
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await authApi.register({ email, password, name });
        setTokens(data.accessToken, data.refreshToken);
        setUser(data.user);
        router.push("/");
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

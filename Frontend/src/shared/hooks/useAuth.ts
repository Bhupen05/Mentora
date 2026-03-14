/**
 * useAuth Hook
 * Manage authentication state and operations
 */

import { useState, useCallback } from "react";
import { loginUser, registerUser, logoutUser } from "../../services/authService";
import type { User, RegisterData, LoginCredentials } from "../../shared/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Login failed");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(data);
      setUser(response.user);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Registration failed");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Logout failed");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = user !== null;

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };
}

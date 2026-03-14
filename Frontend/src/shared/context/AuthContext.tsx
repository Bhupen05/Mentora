/**
 * Auth Context
 * Global authentication state management
 * Tracks user authentication status and role
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "mentor" | "parent";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        // TODO: Replace with actual auth check from authService
        // Example: const token = await authService.getStoredToken();
        // if (token) {
        //   const user = await authService.verifyToken(token);
        //   setIsAuthenticated(true);
        //   setUserRole(user.role);
        // }

        // For now, simulate async check
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAuthenticated(false);
        setUserRole(null);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login with authService
      // Example:
      // const response = await authService.login(email, password);
      // await authService.storeToken(response.token);
      // setIsAuthenticated(true);
      // setUserRole(role);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual registration with authService
      // Example:
      // const response = await authService.register(email, password, { role });
      // await authService.storeToken(response.token);
      // setIsAuthenticated(true);
      // setUserRole(role);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual logout with authService
      // Example: await authService.logout();
      // await authService.clearToken();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      // TODO: Implement auth check with authService
      // This can be called periodically to refresh auth state
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, isLoading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

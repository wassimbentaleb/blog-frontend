import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { mockAPI } from '../services/mockData';

// Change this to true to use real API, false for mock data
const USE_MOCK_API = true;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        if (USE_MOCK_API) {
          const response = await mockAPI.getCurrentUser();
          setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      if (USE_MOCK_API) {
        const response = await mockAPI.login(email, password);
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: 'API not configured' };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      if (USE_MOCK_API) {
        const response = await mockAPI.register(name, email, password);
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: 'API not configured' };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      // With mock API, just clear local storage
      if (!USE_MOCK_API) {
        // await authAPI.logout(); // Only call real API if not using mock
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

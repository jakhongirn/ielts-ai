'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import wretch from 'wretch';

interface User {
  email: string;
  username: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;  // <-- Add loading state
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);  // <-- Initialize loading state

    const router = useRouter();

  const initializeAuth = useCallback(async () => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setIsLoading(true);  // <-- Start loading
      try {
        const userResponse = await wretch(`${process.env.NEXT_PUBLIC_API}/auth/user/`)
          .auth(`Bearer ${accessToken}`)
          .get()
          .json<User>();
        setUser(userResponse);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
      setIsLoading(false);  // <-- End loading
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);  // <-- Start loading
    try {
      const response = await wretch(`${process.env.NEXT_PUBLIC_API}/auth/token/`)
        .post({ email, password })
        .json<{ access: string; refresh: string }>();
      Cookies.set('accessToken', response.access);
      Cookies.set('refreshToken', response.refresh);
      await initializeAuth();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);  // <-- End loading
    }
  };

  const logout = async () => {
    setIsLoading(true);  // <-- Start loading
    try {
      const refreshToken = Cookies.get('refreshToken');
      await wretch(`${process.env.NEXT_PUBLIC_API}/auth/logout/`)
        .post({ refresh: refreshToken })
        .json();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    } finally {
      setIsLoading(false);  // <-- End loading
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

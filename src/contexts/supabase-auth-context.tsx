"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { authenticateAdminAction } from '@/app/actions';

type SupabaseAuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        // For our custom authentication, we'll check if there's a stored token
        // In a real application, you would implement proper session management
        const token = localStorage.getItem('admin-token');
        if (token) {
          // Validate token (simplified for this example)
          setUser({
            id: 'admin-user-id',
            email: 'admin@skyvera.com',
            role: 'admin',
          } as User);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Use our custom authentication with hashed passwords via Server Action
      const result = await authenticateAdminAction(email, password);

      if (!result.success) {
        return { success: false, message: result.message };
      }

      // For simplicity, we'll create a mock user object
      // In a real application, you would integrate this with Supabase Auth properly
      const mockUser = {
        id: 'admin-user-id',
        email: email,
        role: 'admin',
        // Add other user properties as needed
      } as User;

      setUser(mockUser);
      setIsAuthenticated(true);

      // Store a token for session persistence
      const token = 'admin-session-token';
      localStorage.setItem('admin-token', token);

      // Also set a cookie so the middleware can access it
      document.cookie = `admin-token=${token}; path=/; max-age=86400`; // 24 hours

      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: (error as Error).message };
    }
  };

  const logout = async () => {
    try {
      // For our custom authentication, we'll just clear the stored token
      localStorage.removeItem('admin-token');
      // Also remove the cookie
      document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
}
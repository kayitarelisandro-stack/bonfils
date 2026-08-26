import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authApi } from '../api/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('roadnet_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('roadnet_token')
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await authApi.me();
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('roadnet_user', JSON.stringify(res.data.user));
      localStorage.setItem('roadnet_token', res.data.token);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem('roadnet_user');
      localStorage.removeItem('roadnet_token');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      if (token) {
        await refreshUser();
      }
      setIsLoading(false);
    };
    init();
  }, [token, refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem('roadnet_user', JSON.stringify(res.data.user));
    localStorage.setItem('roadnet_token', res.data.token);
  };

  const register = async (data: Record<string, unknown>) => {
    const res = await authApi.register(data);
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem('roadnet_user', JSON.stringify(res.data.user));
    localStorage.setItem('roadnet_token', res.data.token);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('roadnet_user');
    localStorage.removeItem('roadnet_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

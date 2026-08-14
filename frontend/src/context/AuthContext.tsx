import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../api';

interface User {
  id: number;
  email: string;
  level: string;
  xp: number;
  streak: number;
  coding_hours: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultGuestUser: User = {
  id: 1,
  email: 'learner@codeflow.dev',
  level: 'STARTER',
  xp: 150,
  streak: 3,
  coding_hours: 2.5
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultGuestUser);
  const [token, setToken] = useState<string | null>(localStorage.getItem('codeflow_token'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${getApiBaseUrl()}/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          setUser(defaultGuestUser);
        }
      } else {
        setUser(defaultGuestUser);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('codeflow_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('codeflow_token');
    setToken(null);
    setUser(defaultGuestUser);
  };

  return (
    <AuthContext.Provider value={{ user: user || defaultGuestUser, token: token || 'guest_token', login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

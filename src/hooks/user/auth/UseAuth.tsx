import React, { useState, useEffect, useContext, createContext, ReactNode, useCallback } from 'react';
import { decodeJWT } from '../../../utils/jwtDecode';
import { useRefreshToken } from './useRefreshToken';
// import { useUserProfile } from '../query/hooks/useUserProfile';
interface DecodedToken {
  sub?: string; // username
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | undefined;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  userProfile: any;
  setUserProfile: (userProfile: any) => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: undefined,
  login: () => { },
  logout: () => { },
  userProfile: undefined,
  setUserProfile: () => { },
  refreshAccessToken: async () => null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(localStorage.getItem('accessToken')));
  const [token, setToken] = useState<string>(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState<string>(localStorage.getItem('refreshToken') || '');
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { mutateAsync: refreshTokenMutation } = useRefreshToken();

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    // getUserProfile();
  };

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        logout();
        return null;
      }

      const data = await refreshTokenMutation();
      localStorage.setItem('accessToken', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
        setRefreshToken(data.refresh_token);
      }
      setToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      return null;
    }
  }, [refreshTokenMutation]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken('');
    setRefreshToken('');
    setIsAuthenticated(false);
  };

  // Listen for token changes in localStorage (e.g., from other tabs)
  useEffect(() => {
    const handleStorage = () => {
      const storedToken = localStorage.getItem('accessToken') || '';
      const storedRefreshToken = localStorage.getItem('refreshToken') || '';
      setIsAuthenticated(Boolean(storedToken));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken') || '';
    const storedRefreshToken = localStorage.getItem('refreshToken') || '';
    setIsAuthenticated(Boolean(storedToken));
    setToken(storedToken);
    setRefreshToken(storedRefreshToken);
  }, []);

  // Decode user info from token
  useEffect(() => {
    if (token) {
      const decoded: DecodedToken | null = decodeJWT(token);
      if (decoded?.sub) {
        setUsername(decoded.sub);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        username, 
        login, 
        logout, 
        userProfile, 
        setUserProfile,
        refreshAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

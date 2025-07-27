import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { decodeJWT } from '../../../utils/jwtDecode';
// import { useUserProfile } from '../query/hooks/useUserProfile';
interface DecodedToken {
  sub?: string; // username
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | undefined;
  login: (token: string) => void;
  logout: () => void;
  userProfile: any;
  setUserProfile: (userProfile: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: undefined,
  login: () => { },
  logout: () => { },
  userProfile: undefined,
  setUserProfile: () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(localStorage.getItem('token')));
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<any>(null);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
    // getUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
  };

  // Listen for token changes in localStorage (e.g., from other tabs)
  useEffect(() => {
    const handleStorage = () => {
      const storedToken = localStorage.getItem('token') || '';
      setIsAuthenticated(Boolean(storedToken));
      setToken(storedToken);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || '';
    setIsAuthenticated(Boolean(storedToken));
    setToken(storedToken);
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

  // const getUserProfile = () => {
  //   const data = useUserProfile()
  //   setUserProfile(data)
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

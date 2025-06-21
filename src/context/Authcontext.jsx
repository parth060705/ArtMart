import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout as logoutAPI } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser: loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import { getCurrentUser, logout as apiLogout } from '../services/Authservices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (err) {
      setUser(null);
      console.error('Error fetching user:', err);
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

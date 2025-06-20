// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

const ProtectedRoute = () => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate to="/Loginpage" replace />;
};

export default ProtectedRoute;

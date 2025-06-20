// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // Replace with real auth logic, e.g. check token validity
  const user = localStorage.getItem('user'); 
  return Boolean(user);
};

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/Loginpage" replace />;
};

export default ProtectedRoute;

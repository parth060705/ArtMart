import { Navigate, Outlet } from "react-router-dom";

// Simulated auth check – replace with real logic (e.g., check JWT or user state)
const useAuth = () => {
  const user = localStorage.getItem("user"); // or context/API, Backend logic
  return !!user; // returns true if user is logged in
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="" />;
};

export default ProtectedRoute;

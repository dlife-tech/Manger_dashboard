// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore.js"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (user && !user.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

export default ProtectedRoute;

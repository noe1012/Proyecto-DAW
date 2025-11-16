import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;            // o spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;

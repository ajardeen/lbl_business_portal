import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) return null;  // or loader UI

  return isLoggedIn ? children : <Navigate to="/" />;
}

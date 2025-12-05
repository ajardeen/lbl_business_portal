import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ children, roles }) {
  const { isLoggedIn, role, authLoading } = useAuth();

  if (authLoading) return null;

  if (!isLoggedIn) return <Navigate to="/" />;

  if (roles && !roles.includes(role)) {
    const redirectPage = {
      admin: "/dashboard",
      staff: "/cloud-kitchen/orders",
      chef: "/cloud-kitchen/kdn",
      rider: "/cloud-kitchen/rider",
    }[role] || "/";
    return <Navigate to={redirectPage} replace />;
  }

  return children;
}


import { Navigate } from "react-router-dom";

function RoleRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;

  // If role not allowed
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" />;

  return children;
}

export default RoleRoute;

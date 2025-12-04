import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import Layout from "../layouts/Layout";

import LoginForm from "../pages/Auth/LoginForm";
import SignupForm from "../pages/Auth/SignupForm";
import RoleSelection from "../pages/Auth/RoleSelection";
import OrganizationRegister from "../pages/Organization/OrganizationRegister";

import { protectedRoutes } from "./routeConfig";
import { useAuth } from "@/context/AuthContext";

export default function AppRoutes() {
   const { authLoading } = useAuth();

  if (authLoading) {
    return <div className="global-loading">Loading authentication...</div>; 
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<RoleSelection />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* One-time protected route (no role restriction) */}
      <Route
        path="/organization/register"
        element={
          <PrivateRoute>
            <OrganizationRegister />
          </PrivateRoute>
        }
      />

      {/* Auto-generated protected + role-based routes */}
      {protectedRoutes.map(({ path, layout, component: Component, roles }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <RoleRoute roles={roles}>
              <PrivateRoute>
                {layout ? (
                  <Layout>
                    <Component />
                  </Layout>
                ) : (
                  <Component />
                )}
              </PrivateRoute>
            </RoleRoute>
          }
        />
      ))}
    </Routes>
  );
}

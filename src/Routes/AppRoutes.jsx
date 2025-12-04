import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layouts/Layout";

import AuthPage from "../pages/Auth/AuthPage";
import LoginForm from "../pages/Auth/LoginForm";
import SignupForm from "../pages/Auth/SignupForm";
import RoleSelection from "../pages/Auth/RoleSelection";
import OrganizationRegister from "../pages/Organization/OrganizationRegister";

import { protectedRoutes } from "./routeConfig";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<RoleSelection />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected routes */}
      <Route
        path="/organization/register"
        element={
          <PrivateRoute>
            <OrganizationRegister />
          </PrivateRoute>
        }
      />

      {protectedRoutes.map(({ path, layout, element }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <PrivateRoute>
              {layout ? <Layout>{element}</Layout> : element}
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}

import "./App.css";
import "./styles/defaultStyles.css";
import "./styles/UIStyles.css";
import "./styles/tableStyles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LeadGeneration from "./pages/LeadGeneration/LeadGeneration";
import Dashboard from "./pages/Dashboard/Dashboard";

import PrivateRoute from "./Routes/PrivateRoute";
import Settings from "./pages/Settings/Settings";
import { Toaster } from "sonner";
import BranchMaster from "./pages/Master/Branch/BranchMaster";
import CategoryMaster from "./pages/Master/Category/CategoryMaster";
import AuthPage from "./pages/Auth/AuthPage";
import LoginForm from "./pages/Auth/LoginForm";
import SignupForm from "./pages/Auth/SignupForm";
import OrganizationRegister from "./pages/Organization/OrganizationRegister";
import { OrganizationProvider } from "./context/OrganizationContext";
import ItemMaster from "./pages/Master/Item/ItemMaster";
import MenuMaster from "./pages/Master/Menu/MenuMaster";
import BundleMaster from "./pages/Master/Bundle/BundleMaster";
import VA_BundleFormScreen from "./pages/Master/Bundle/VA_BundleFormScreen";
import OrderTracker from "./pages/CloudKitchen/OrderTracker";

function App() {
  return (
    <Router>
        <OrganizationProvider>
      <Routes>
        {/* Login page (no layout) */}
        <Route path="/" element={<AuthPage />}>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Route>
          {/* Protected app routes with layout */}
          <Route
            path="/organization/register"
            element={
              <PrivateRoute>
                <OrganizationRegister />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cloud-kitchen/orders"
            element={
              <PrivateRoute>
                <Layout>
                  <OrderTracker  />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <PrivateRoute>
                <Layout>
                  <LeadGeneration />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/master/branch"
            element={
              <PrivateRoute>
                <Layout>
                  <BranchMaster />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/master/category"
            element={
              <PrivateRoute>
                <Layout>
                  <CategoryMaster />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/master/items"
            element={
              <PrivateRoute>
                <Layout>
                  <ItemMaster />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/master/menus"
            element={
              <PrivateRoute>
                <Layout>
                  <MenuMaster />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/master/bundles"
            element={
              <PrivateRoute>
                <Layout>
                  <BundleMaster />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/master/bundles/create"
            element={
              <PrivateRoute>
                <Layout>
                  <VA_BundleFormScreen />
                </Layout>
              </PrivateRoute>
            }
          />

      </Routes>
        </OrganizationProvider>

      <Toaster richColors expand={true} position="top-right" />
    </Router>
  );
}

export default App;

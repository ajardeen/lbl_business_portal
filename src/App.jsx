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
import { AuthProvider } from "./context/AuthContext";
import ItemMaster from "./pages/Master/Item/ItemMaster";
import MenuMaster from "./pages/Master/Menu/MenuMaster";
import BundleMaster from "./pages/Master/Bundle/BundleMaster";
import VA_BundleFormScreen from "./pages/Master/Bundle/VA_BundleFormScreen";
import OrderTracker from "./pages/CloudKitchen/OrderTracker";
import RoleSelection from "./pages/Auth/RoleSelection";
import KitchenDisplayScreen from "./pages/CloudKitchen/KDS/KitchenDisplayScreen";
import StaffMaster from "./pages/MyStaff/StaffMaster";
import RiderOrderTracker from "./pages/CloudKitchen/RiderScreens/RiderOrderTracker";
import Rider from "./pages/CloudKitchen/RiderScreens/Rider";
import RiderOrderDetail from "./pages/CloudKitchen/RiderScreens/RiderOrderDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

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
                  <OrderTracker />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cloud-kitchen/kdn"
            element={
              <PrivateRoute>
                <KitchenDisplayScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/cloud-kitchen/rider"
            element={
              <PrivateRoute>
                <Rider />
              </PrivateRoute>
            }
          />
          <Route
            path="/cloud-kitchen/rider/order/:orderId"
            element={
              <PrivateRoute>
                <RiderOrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/cloud-kitchen/rider/order/:id/track"
            element={
              <PrivateRoute>
                <RiderOrderTracker />
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
          <Route
            path="/staff-master"
            element={
              <PrivateRoute>
                <Layout>
                  <StaffMaster />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>

      <Toaster richColors expand={true} position="top-right" />
    </Router>
  );
}

export default App;

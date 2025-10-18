import "./App.css";
import "./styles/defaultStyles.css";
import "./styles/UIStyles.css";
import './styles/tableStyles.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LeadGeneration from "./pages/LeadGeneration/LeadGeneration";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";

import PrivateRoute from "./Routes/PrivateRoute";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page (no layout) */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected app routes with layout */}
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
      </Routes>
    </Router>
  );
}

export default App;

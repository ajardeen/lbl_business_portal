import "./App.css";
import "./styles/defaultStyles.css";
import "./styles/UIStyles.css";
import "./styles/tableStyles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";

import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
   <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

      <Toaster richColors expand={true} position="top-right" />
    </Router>
  );
}

export default App;

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setChecking(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (currentToken) => {
      setToken(currentToken);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return null; // or loading spinner

  return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;

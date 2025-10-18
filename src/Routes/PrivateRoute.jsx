import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setChecking(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return null; // or loading spinner

  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;

"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Context
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// Hook (just like useTheme from next-themes)
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider
export function ThemeProvider({ children, defaultTheme = "system" }) {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const [theme, setTheme] = useState(() => {
    if (defaultTheme === "system") return getSystemTheme();
    return defaultTheme;
  });

  useEffect(() => {
    // Store theme in localStorage
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Sync system theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (localStorage.getItem("theme") === "system") {
        setTheme(getSystemTheme());
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

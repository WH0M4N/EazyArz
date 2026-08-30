"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import getTheme, { type ThemeMode } from "@/theme/theme";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "easyarz-theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme once on the client
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      setMode(savedTheme);
    }

    setMounted(true);
  }, []);

  // Save theme whenever it changes
  useEffect(() => {
    if (!mounted) return;

    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, mounted]);

  const theme = useMemo(() => {
    return getTheme(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode = currentMode === "light" ? "dark" : "light";

      // Save immediately
      window.localStorage.setItem(STORAGE_KEY, newMode);

      return newMode;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
}

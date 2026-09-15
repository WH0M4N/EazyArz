"use client";

import {
  createContext,
  useContext,
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

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  const theme = useMemo(() => {
    return getTheme(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode = currentMode === "light" ? "dark" : "light";

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

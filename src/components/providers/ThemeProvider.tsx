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

interface ThemeProviderProps {
  children: ReactNode;
  initialMode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "easyarz-theme";
const COOKIE_KEY = "easyarz-theme";

export default function ThemeProvider({
  children,
  initialMode,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const theme = useMemo(() => {
    return getTheme(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode: ThemeMode = currentMode === "light" ? "dark" : "light";

      window.localStorage.setItem(STORAGE_KEY, newMode);

      document.cookie = `${COOKIE_KEY}=${newMode}; path=/; max-age=31536000; SameSite=Lax`;

      document.documentElement.style.colorScheme = newMode;

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

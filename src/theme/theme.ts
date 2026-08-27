"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",

  palette: {
    mode: "light",

    primary: {
      main: "#0F766E",
      dark: "#115E59",
      light: "#14B8A6",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#C99A2E",
      dark: "#A67C1F",
      light: "#E5C76B",
      contrastText: "#17211F",
    },

    background: {
      default: "#F6F7F4",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#17211F",
      secondary: "#68736F",
    },

    divider: "#E2E7E4",

    success: {
      main: "#16805B",
    },

    error: {
      main: "#C94B4B",
    },
  },

  typography: {
    fontFamily: '"EasyArzFont", sans-serif',

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontWeight: 400,
    },

    body2: {
      fontWeight: 400,
    },

    button: {
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(23, 33, 31, 0.06)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;

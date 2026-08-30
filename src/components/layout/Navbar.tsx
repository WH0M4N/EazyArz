"use client";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import Link from "next/link";
import { useAppTheme } from "../providers/ThemeProvider";

const navItems = [
  {
    label: "خانه",
    href: "/",
  },
  {
    label: "اخبار",
    href: "/news",
  },
  {
    label: "آموزش",
    href: "/tutorials",
  },
];

export default function Navbar() {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              xs: 64,
              md: 72,
            },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Typography
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontSize: "1.4rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            ایزی ارز
          </Typography>
          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  px: 2,

                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          {/* Actions */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* Theme Switch */}
            <Tooltip title={mode === "light" ? "حالت تاریک" : "حالت روشن"}>
              <IconButton
                onClick={toggleTheme}
                aria-label="تغییر حالت نمایش"
                sx={{
                  width: 42,
                  height: 42,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,

                  transition:
                    "transform 0.25s ease, background-color 0.25s ease",

                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "rotate(15deg)",
                  },
                }}
              >
                {mode === "light" ? (
                  <DarkModeRoundedIcon />
                ) : (
                  <LightModeRoundedIcon />
                )}
              </IconButton>
            </Tooltip>

            {/* Profile Button */}
            <Button
              component={Link}
              href="/profile"
              variant="contained"
              sx={{
                px: 2.5,
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
              }}
            >
              حساب کاربری
            </Button>

            {/* Mobile Menu */}

            <IconButton
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

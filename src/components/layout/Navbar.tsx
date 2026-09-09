"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useAppTheme } from "../providers/ThemeProvider";
import logo from "../../assests/Images/logo.png";

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

const upcomingItems = [
  {
    label: "هوش مصنوعی",
    type: "ai",
  },
  {
    label: "قیمت ارزها",
    type: "prices",
  },
];

export default function Navbar() {
  const { mode, toggleTheme } = useAppTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underConstruction, setUnderConstruction] = useState<string | null>(
    null,
  );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleUnderConstruction = (type: string) => {
    setUnderConstruction(type);
  };

  const closeConstructionDialog = () => {
    setUnderConstruction(null);
  };

  const constructionTitle =
    underConstruction === "ai" ? "هوش مصنوعی" : "قیمت ارزها";

  return (
    <>
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
                xs: 58,
                md: 64,
              },
              height: {
                xs: 58,
                md: 64,
              },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                height: "100%",
              }}
            >
              <Image
                src={logo}
                alt="EasyArz"
                width={120}
                height={70}
                priority
                style={{
                  width: "120px",
                  height: "55px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={0.25}
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
                    minWidth: "auto",
                    px: 1.75,
                    py: 0.75,
                    color: "text.secondary",
                    fontSize: "16px",
                    fontWeight: 600,

                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Upcoming desktop items */}
              {upcomingItems.map((item) => (
                <Button
                  key={item.type}
                  onClick={() => handleUnderConstruction(item.type)}
                  sx={{
                    minWidth: "auto",
                    px: 1.75,
                    py: 0.75,
                    color: "text.secondary",
                    fontSize: "16px",
                    fontWeight: 600,

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
              {/* Theme */}
              <Tooltip title={mode === "light" ? "حالت تاریک" : "حالت روشن"}>
                <IconButton
                  onClick={toggleTheme}
                  aria-label="تغییر حالت نمایش"
                  sx={{
                    width: 38,
                    height: 38,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,

                    transition:
                      "transform 0.2s ease, background-color 0.2s ease",

                    "&:hover": {
                      bgcolor: "action.hover",
                      transform: "rotate(12deg)",
                    },
                  }}
                >
                  {mode === "light" ? (
                    <DarkModeRoundedIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <LightModeRoundedIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* Desktop Profile */}
              <Button
                component={Link}
                href="/profile"
                variant="contained"
                startIcon={
                  <PersonOutlineRoundedIcon
                    sx={{
                      marginLeft: "10px",
                    }}
                  />
                }
                sx={{
                  minHeight: 38,
                  pl: 2,
                  pr: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  marginX: "12px !important",

                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },

                  transition: "transform 0.2s ease, box-shadow 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 5px 14px rgba(15, 118, 110, 0.2)",
                  },
                }}
              >
                حساب کاربری
              </Button>

              {/* Mobile Menu Button */}
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                aria-label="باز کردن منو"
                sx={{
                  width: 40,
                  height: 40,

                  display: {
                    xs: "flex",
                    md: "none",
                  },

                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,

                  transition: "background-color 0.2s ease, transform 0.2s ease",

                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <MenuRoundedIcon sx={{ fontSize: 23 }} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        PaperProps={{
          sx: {
            width: {
              xs: "82%",
              sm: 360,
            },
            bgcolor: "background.paper",
            color: "text.primary",
          },
        }}
      >
        {/* Drawer Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            height: 64,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            منوی ایزی ارز
          </Typography>

          <IconButton
            onClick={closeMobileMenu}
            aria-label="بستن منو"
            size="small"
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {/* Navigation */}
        <List
          disablePadding
          sx={{
            px: 1.5,
            py: 2,
          }}
        >
          {navItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={closeMobileMenu}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                mb: 0.5,
                px: 2,

                "&:hover": {
                  bgcolor: "action.hover",
                  color: "primary.main",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />

              <ArrowBackIosNewRoundedIcon
                sx={{
                  fontSize: 15,
                  color: "text.secondary",
                }}
              />
            </ListItemButton>
          ))}

          {/* Upcoming mobile items */}
          {upcomingItems.map((item) => (
            <ListItemButton
              key={item.type}
              onClick={() => {
                handleUnderConstruction(item.type);
                closeMobileMenu();
              }}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                mb: 0.5,
                px: 2,

                "&:hover": {
                  bgcolor: "action.hover",
                  color: "primary.main",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />

              <ArrowBackIosNewRoundedIcon
                sx={{
                  fontSize: 15,
                  color: "text.secondary",
                }}
              />
            </ListItemButton>
          ))}

          {/* Profile */}
          <ListItemButton
            component={Link}
            href="/profile"
            onClick={closeMobileMenu}
            sx={{
              minHeight: 52,
              mt: 1,
              borderRadius: 2,
              px: 2,

              bgcolor: "primary.main",
              color: "primary.contrastText",

              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <PersonOutlineRoundedIcon
              sx={{
                ml: 1,
                fontSize: 21,
              }}
            />

            <ListItemText
              primary="حساب کاربری"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />

            <ArrowBackIosNewRoundedIcon
              sx={{
                fontSize: 15,
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ================= UNDER CONSTRUCTION DIALOG ================= */}
      <Dialog
        open={!!underConstruction}
        onClose={closeConstructionDialog}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            width: "100%",
            maxWidth: 420,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: 700,
          }}
        >
          <ConstructionRoundedIcon color="primary" />

          {constructionTitle}
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
            این بخش در حال توسعه است و به‌زودی در ایزی ارز در دسترس خواهد بود.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 1 }}>
          <Button
            onClick={closeConstructionDialog}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            متوجه شدم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assests/Images/logo.png";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "اخبار", href: "/news" },
  { label: "آموزش", href: "/tutorials" },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Image
              src={logo}
              alt="logo"
              objectFit="cover"
              style={{ width: "100px", height: "40px" }}
            />
          </Link>

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  px: 2,
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "rgba(37, 99, 235, 0.06)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              component={Link}
              href="/profile"
              variant="outlined"
              startIcon={
                <AccountCircleOutlinedIcon style={{ marginLeft: "12px" }} />
              }
              sx={{
                mr: 1,
                borderColor: "divider",
                color: "text.primary",
              }}
            >
              پروفایل
            </Button>
          </Box>

          {/* Mobile navigation */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              onClick={handleOpen}
              aria-label="باز کردن منو"
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={handleClose}
                  sx={{ minWidth: 150 }}
                >
                  {item.label}
                </MenuItem>
              ))}

              <MenuItem component={Link} href="/profile" onClick={handleClose}>
                پروفایل
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

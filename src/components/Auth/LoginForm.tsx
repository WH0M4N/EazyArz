"use client";

import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function LoginForm() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: gmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error(error);
      setError("ورود ناموفق بود. لطفا اطلاعات را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
      }}
    >
      <Stack spacing={2.5}>
        <Box textAlign="center">
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "text.primary", mb: 1 }}
          >
            ورود به حساب
          </Typography>

          <Typography variant="body2" color="text.secondary">
            برای ورود اطلاعات حساب خود را وارد کنید
          </Typography>
        </Box>

        <TextField
          fullWidth
          type="email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          placeholder="Gmail"
          required
          slotProps={{
            input: {
              dir: "ltr",
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          required
          slotProps={{
            input: {
              dir: "ltr",
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffRoundedIcon />
                    ) : (
                      <VisibilityRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {error && (
          <Typography color="error" fontSize={14}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.4,
            fontWeight: 700,
          }}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </Button>
      </Stack>
    </Box>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";

import { verifyEmail } from "@/services/auth.service";

const normalizeDigits = (value: string) => {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/\D/g, "");
};

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace("/account");
    }
  }, [email, router]);

  const handleVerify = async () => {
    setError("");

    const normalizedCode = normalizeDigits(code);

    if (normalizedCode.length !== 6) {
      setError("کد تایید باید ۶ رقم باشد.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyEmail({
        email,
        code: normalizedCode,
      });

      console.log("VERIFY RESPONSE:", response);

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/login?verified=true");
      }, 1200);
    } catch (error) {
      console.error("VERIFY ERROR:", error);

      setError("کد تایید صحیح نیست یا تایید ایمیل انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 5,
            p: { xs: 3, md: 5 },
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <MarkEmailReadRoundedIcon sx={{ fontSize: 38 }} />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    md: "2.2rem",
                  },
                  letterSpacing: "-0.03em",
                }}
              >
                تایید ایمیل
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  lineHeight: 1.9,
                }}
              >
                کد ۶ رقمی ارسال شده به ایمیل زیر را وارد کنید.
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  direction: "ltr",
                }}
              >
                {email}
              </Typography>
            </Box>

            <TextField
              fullWidth
              value={code}
              onChange={(e) => {
                const value = normalizeDigits(e.target.value).slice(0, 6);

                setCode(value);
                setError("");
              }}
              error={!!error}
              helperText={error}
              placeholder="کد تایید"
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  letterSpacing: "0.5rem",
                  fontSize: "1.5rem",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleVerify}
              disabled={loading || code.length !== 6}
              sx={{
                py: 1.4,
                borderRadius: 2.5,
                fontWeight: 700,
              }}
            >
              {loading ? "در حال تایید..." : "تایید ایمیل"}
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1200}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" variant="filled">
          ایمیل شما با موفقیت تایید شد.
        </Alert>
      </Snackbar>
    </Box>
  );
}

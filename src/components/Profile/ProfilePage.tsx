"use client";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { z } from "zod";

export default function AccountProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const profileSchema = z
    .object({
      phone: z
        .string()
        .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود."),

      email: z
        .string()
        .email("ایمیل وارد شده معتبر نیست.")
        .regex(/^[^\s@]+@gmail\.com$/, "ایمیل باید یک آدرس Gmail معتبر باشد."),

      password: z
        .string()
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
        .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد.")
        .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد.")
        .regex(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد.")
        .regex(
          /[^A-Za-z0-9]/,
          "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد.",
        ),

      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "تکرار رمز عبور با رمز عبور یکسان نیست.",
      path: ["repeatPassword"],
    });

  const handleSave = () => {
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");

    const result = profileSchema.safeParse({
      phone,
      email,
      password,
      repeatPassword,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "phone") {
          setPhoneError(issue.message);
        }

        if (issue.path[0] === "email") {
          setEmailError(issue.message);
        }

        if (issue.path[0] === "password") {
          setPasswordError(issue.message);
        }

        if (issue.path[0] === "repeatPassword") {
          setRepeatPasswordError(issue.message);
        }
      });

      return;
    }

    // Validation passed
    console.log({
      firstName,
      lastName,
      phone,
      email,
      password,
      repeatPassword,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 160px)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          {/* Page heading */}

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "2.5rem",
                },
                letterSpacing: "-0.03em",
              }}
            >
              حساب کاربری
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: "0.95rem",
              }}
            >
              اطلاعات شخصی و راه‌های ارتباطی خود را مدیریت کنید.
            </Typography>
          </Box>

          {/* Main profile surface */}

          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: 5,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {/* Profile top section */}

            <Box
              sx={{
                px: { xs: 3, md: 5 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 76,
                    height: 76,
                    bgcolor: "primary.main",
                    borderRadius: 3,
                  }}
                >
                  <PersonRoundedIcon
                    sx={{
                      fontSize: 38,
                    }}
                  />
                </Avatar>

                <Box sx={{ flex: 1, margin: "20px !important" }}>
                  <Typography variant="h6" fontWeight={750} sx={{ mb: 0.75 }}>
                    پروفایل شما
                  </Typography>

                  <Typography color="text.secondary" variant="body2">
                    اطلاعات حساب خود را وارد کنید تا پروفایل شما کامل شود.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Form */}

            <Box
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },
              }}
            >
              <Stack spacing={4}>
                {/* Personal info */}

                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      mb: 0.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    اطلاعات شخصی
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2.5 }}
                  >
                    نام و نام خانوادگی خود را وارد کنید.
                  </Typography>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    sx={{
                      gap: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="نام"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <PersonRoundedIcon
                            sx={{
                              mr: 2,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      placeholder="نام خانوادگی"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <PersonRoundedIcon
                            sx={{
                              mr: 2,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      }}
                    />
                  </Stack>
                </Box>

                {/* Contact info */}

                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      mb: 0.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    اطلاعات تماس
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2.5 }}
                  >
                    شماره موبایل و ایمیل مرتبط با حساب شما.
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="شماره موبایل"
                      error={!!phoneError}
                      helperText={phoneError}
                      InputProps={{
                        startAdornment: (
                          <PhoneRoundedIcon
                            sx={{
                              mr: 2,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ایمیل"
                      error={!!emailError}
                      helperText={emailError}
                      InputProps={{
                        startAdornment: (
                          <EmailRoundedIcon
                            sx={{
                              mr: 2,
                              color: "text.secondary",
                            }}
                          />
                        ),
                      }}
                    />
                  </Stack>
                </Box>

                {/* Password */}

                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      mb: 0.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    امنیت حساب
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2.5 }}
                  >
                    برای امنیت حساب خود یک رمز عبور انتخاب کنید.
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="رمز عبور"
                      error={!!passwordError}
                      helperText={passwordError}
                      InputProps={{
                        startAdornment: (
                          <LockRoundedIcon
                            sx={{
                              ml: 2,
                              color: "text.secondary",
                            }}
                          />
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
                      }}
                    />

                    <TextField
                      fullWidth
                      type={showRepeatPassword ? "text" : "password"}
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      placeholder="تکرار رمز عبور"
                      error={!!repeatPasswordError}
                      helperText={repeatPasswordError}
                      InputProps={{
                        startAdornment: (
                          <LockRoundedIcon
                            sx={{
                              ml: 2,
                              color: "text.secondary",
                            }}
                          />
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowRepeatPassword((prev) => !prev)
                              }
                              edge="end"
                            >
                              {showRepeatPassword ? (
                                <VisibilityOffRoundedIcon />
                              ) : (
                                <VisibilityRoundedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </Box>

                <Divider />

                {/* Save */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    sx={{
                      px: 4,
                      py: 1.25,
                      borderRadius: 2.5,
                      fontWeight: 700,
                    }}
                  >
                    ذخیره تغییرات
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

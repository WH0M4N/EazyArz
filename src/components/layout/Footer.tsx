import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0F172A",
        color: "#FFFFFF",
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={4}
          >
            <Box sx={{ maxWidth: 360 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                EasyArz
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 2,
                }}
              >
                مرجعی ساده برای یادگیری، دنبال کردن اخبار و آشنایی با دنیای
                ارزهای دیجیتال.
              </Typography>
            </Box>

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                دسترسی سریع
              </Typography>

              <Link
                href="/"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                }}
              >
                خانه
              </Link>

              <Link
                href="/news"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                }}
              >
                اخبار
              </Link>

              <Link
                href="/tutorials"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                }}
              >
                آموزش
              </Link>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ py: 2.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} EasyArz — تمامی حقوق محفوظ است.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

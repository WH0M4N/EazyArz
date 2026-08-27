import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        py: { xs: 9, md: 13 },
      }}
    >
      {/* Decorative shape */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.06,
          top: -180,
          left: -100,
        }}
      />

      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          textAlign="center"
          spacing={3}
          sx={{
            position: "relative",
            maxWidth: 760,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 10,
              bgcolor: "rgba(37, 99, 235, 0.08)",
              color: "primary.main",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              دنیای ارز دیجیتال، ساده‌تر از همیشه
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.25rem",
                sm: "3rem",
                md: "4rem",
              },
              fontWeight: 700,
              lineHeight: 1.35,
              color: "text.primary",
            }}
          >
            ارز دیجیتال را
            <Box component="span" sx={{ color: "primary.main" }}>
              {" "}
              ساده
            </Box>{" "}
            یاد بگیرید
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              lineHeight: 2,
              maxWidth: 620,
            }}
          >
            اخبار، آموزش و اطلاعات کاربردی درباره ارزهای دیجیتال؛ بدون پیچیدگی و
            اصطلاحات گیج‌کننده.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1 }}
          >
            <Button
              component={Link}
              href="/tutorials"
              variant="contained"
              size="large"
              endIcon={<ArrowBackRoundedIcon />}
              sx={{
                px: 3.5,
                py: 1.4,
              }}
            >
              شروع یادگیری
            </Button>

            <Button
              component={Link}
              href="/news"
              variant="outlined"
              size="large"
              sx={{
                px: 3.5,
                py: 1.4,
              }}
            >
              آخرین اخبار
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

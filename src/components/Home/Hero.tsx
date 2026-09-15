import { Box, Container, Stack, Typography } from "@mui/material";
// import Link from "next/link";
// import { GrFormPrevious } from "react-icons/gr";

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
            دنیای ارز های دیجیتال به زبان{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              {" "}
              ساده{" "}
            </Box>
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
            ارز دیجیتال را با ایزی ارز، آسان یاد بگیرید.
            <br />
            اخبار، آموزش و اطلاعات کاربردی بازار برای سرمایه گذاری هوشمند.
          </Typography>

          {/* <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1, gap: 2, alignItems: "center" }}
          >
            <Button
              component={Link}
              href="/tutorials"
              variant="contained"
              size="large"
              sx={{
                px: 3.5,
                py: 1.4,
                gap: 0.5,

                "&:hover .arrow": {
                  transform: "translateX(-10px)",
                },
              }}
            >
              شروع یادگیری
              <Box
                className="arrow"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: "3px",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <GrFormPrevious
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Box>
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
          </Stack> */}
        </Stack>
      </Container>
    </Box>
  );
}

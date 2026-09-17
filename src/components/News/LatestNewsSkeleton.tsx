"use client";

import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LatestNewsSkeleton() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
            {/* Title */}
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: { xs: 190, md: 245 },
                height: { xs: 58, md: 70 },
                transform: "none",
                borderRadius: 2,
                mb: 0.7,
              }}
            />

            {/* Subtitle */}
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: { xs: 245, md: 350 },
                height: { xs: 22, md: 24 },
                transform: "none",
                borderRadius: 1.5,
              }}
            />
          </Box>

          {/* Desktop all-news link */}
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              display: { xs: "none", sm: "block" },
              width: 95,
              height: 30,
              borderRadius: 2,
            }}
          />
        </Stack>

        {/* Slider */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: 4, md: 5 },
            backgroundColor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 20px 60px rgba(23, 33, 31, 0.08)"
                : "0 20px 60px rgba(0, 0, 0, 0.28)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.05fr 0.95fr",
              },
              minHeight: {
                xs: "auto",
                md: 420,
              },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                position: "relative",
                minHeight: {
                  xs: 240,
                  sm: 310,
                  md: 420,
                },
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  width: "100%",
                  height: "100%",
                  transform: "none",
                }}
              />

              {/* Category */}
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  position: "absolute",
                  top: { xs: 16, md: 22 },
                  right: { xs: 16, md: 22 },
                  width: 80,
                  height: 30,
                  borderRadius: 2.5,
                }}
              />
            </Box>

            {/* Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5.5,
                },
              }}
            >
              {/* Date */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
                sx={{
                  mb: 2,
                }}
              >
                <Skeleton
                  variant="circular"
                  animation="wave"
                  sx={{
                    width: 17,
                    height: 17,
                  }}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: 70,
                    height: 20,
                    transform: "none",
                    borderRadius: 1,
                    mx: "8px !important",
                  }}
                />
              </Stack>

              {/* Title */}
              <Stack
                spacing={0.5}
                sx={{
                  mb: 1.5,
                }}
              >
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: "92%",
                    height: { xs: 34, md: 40 },
                    transform: "none",
                    borderRadius: 1.5,
                  }}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: "75%",
                    height: { xs: 34, md: 40 },
                    transform: "none",
                    borderRadius: 1.5,
                  }}
                />
              </Stack>

              {/* Description */}
              <Stack
                spacing={0.6}
                sx={{
                  mb: 3,
                }}
              >
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: "100%",
                    height: 22,
                    transform: "none",
                    borderRadius: 1,
                  }}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: "95%",
                    height: 22,
                    transform: "none",
                    borderRadius: 1,
                  }}
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: "65%",
                    height: 22,
                    transform: "none",
                    borderRadius: 1,
                  }}
                />
              </Stack>

              {/* Button */}
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  width: 105,
                  height: 43,
                  borderRadius: 2.5,
                }}
              />
            </Box>
          </Box>

          {/* Previous arrow */}
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              position: "absolute",
              top: "50%",
              left: { xs: 10, md: 18 },
              transform: "translateY(-50%)",
              width: { xs: 38, md: 44 },
              height: { xs: 38, md: 44 },
            }}
          />

          {/* Next arrow */}
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: 10, md: 18 },
              transform: "translateY(-50%)",
              width: { xs: 38, md: 44 },
              height: { xs: 38, md: 44 },
            }}
          />
        </Box>

        {/* Progress indicators */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={0.8}
          sx={{
            mt: 3,
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: 34,
              height: 6,
              borderRadius: 10,
            }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: 8,
              height: 6,
              borderRadius: 10,
            }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: 8,
              height: 6,
              borderRadius: 10,
            }}
          />
        </Stack>

        {/* Mobile all-news link */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            mt: 3,
          }}
        >
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: 125,
              height: 25,
              transform: "none",
              borderRadius: 1.5,
            }}
          />

          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              width: 18,
              height: 18,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

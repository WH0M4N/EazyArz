"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { newsArticles } from "@/data/news";

export default function LatestNews() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const articles = newsArticles.slice(0, 5);

  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles.length) return null;

  const activeArticle = articles[activeIndex];

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % articles.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + articles.length) % articles.length,
    );
  };

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
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: "bold",
                color: "text.primary",
                mb: 0.7,
              }}
            >
              آخرین اخبار
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                color: "text.secondary",
              }}
            >
              جدیدترین مطالب و اخبار دنیای ارزهای دیجیتال
            </Typography>
          </Box>

          <Box
            component={Link}
            href="/news"
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.5,
              color: "primary.main",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 700,
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            مشاهده همه
            <ArrowBackRoundedIcon fontSize="small" />
          </Box>
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
                ? "0 8px 30px rgba(23, 33, 31, 0.07)"
                : "0 8px 30px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
              minHeight: { xs: "auto", md: 400 },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 230, sm: 300, md: 400 },
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={activeArticle.image}
                alt={activeArticle.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Category */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  px: 1.5,
                  py: 0.7,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.92)"
                      : "rgba(24,34,32,0.92)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  {activeArticle.category}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 3, sm: 4, md: 5 },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
                sx={{
                  mb: 2,
                  color: "text.secondary",
                }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 17 }} />

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    mx: "8px !important",
                  }}
                >
                  {activeArticle.date}
                </Typography>
              </Stack>

              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  lineHeight: 1.7,
                  fontWeight: "bold",
                  color: "text.primary",
                  mb: 1.5,
                }}
              >
                {activeArticle.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.9rem", md: "0.98rem" },
                  lineHeight: 2,
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                {activeArticle.description}
              </Typography>

              <Box
                component={Link}
                href={`/news/${activeArticle.slug}`}
                sx={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.7,
                  px: 2.2,
                  py: 1.1,
                  borderRadius: 2.5,
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                مطالعه خبر
                <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          </Box>

          {/* Navigation arrows */}
          {articles.length > 1 && (
            <>
              <IconButton
                onClick={previousSlide}
                aria-label="خبر قبلی"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: { xs: 12, md: 18 },
                  transform: "translateY(-50%)",
                  width: 42,
                  height: 42,
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "background.paper",
                    color: "primary.main",
                  },
                }}
              >
                <ArrowForwardRoundedIcon />
              </IconButton>

              <IconButton
                onClick={nextSlide}
                aria-label="خبر بعدی"
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: { xs: 12, md: 18 },
                  transform: "translateY(-50%)",
                  width: 42,
                  height: 42,
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "background.paper",
                    color: "primary.main",
                  },
                }}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Dots */}
        {articles.length > 1 && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={0.8}
            sx={{ mt: 3 }}
          >
            {articles.map((article, index) => (
              <Box
                key={article.id}
                component="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`خبر ${index + 1}`}
                sx={{
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                  width: index === activeIndex ? 20 : 8,
                  height: 8,
                  borderRadius: 10,
                  backgroundColor:
                    index === activeIndex
                      ? "primary.main"
                      : theme.palette.divider,
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </Stack>
        )}

        {/* Mobile all-news link */}
        <Box
          component={Link}
          href="/news"
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            mt: 3,
            color: "primary.main",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          مشاهده همه اخبار
          <ArrowBackRoundedIcon fontSize="small" />
        </Box>
      </Container>
    </Box>
  );
}

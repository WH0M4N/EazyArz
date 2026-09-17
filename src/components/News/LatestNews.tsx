"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LatestNewsSkeleton from "./LatestNewsSkeleton";

interface Article {
  id: number;
  title: string;
  slug: string;
  categoryName: string;
  contexnt: string;
  coverImageUrl: string;
  summary: string;
}

const AUTOPLAY_DELAY = 4000;

export default function LatestNews() {
  const theme = useTheme();

  const [articles, setArticles] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "rtl",
      duration: 35,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: AUTOPLAY_DELAY,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  /*
   * Fetch articles
   */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/admin/articles", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const result = await response.json();

        setArticles(result.data?.slice(-3).reverse() ?? []);
      } catch (error) {
        console.error("Failed to fetch latest articles:", error);
      }
    };

    fetchArticles();
  }, []);

  /*
   * Keep React state synchronized with Embla.
   */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  /*
   * Navigation
   */
  const nextSlide = () => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
    emblaApi.plugins().autoplay?.reset();
  };

  const previousSlide = () => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
    emblaApi.plugins().autoplay?.reset();
  };

  const goToSlide = (index: number) => {
    if (!emblaApi) return;

    emblaApi.scrollTo(index);
    emblaApi.plugins().autoplay?.reset();
  };

  if (!articles.length) {
    return <LatestNewsSkeleton />;
  }

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
            <Typography
              sx={{
                fontSize: { xs: "2.4rem", md: "3rem" },
                fontWeight: "bold",
                color: "text.primary",
                mb: 0.7,
                letterSpacing: "-0.02em",
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
              fontWeight: "bold",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "primary.dark",
                gap: 0.8,
              },
            }}
          >
            مشاهده همه
            <ArrowBackRoundedIcon fontSize="small" />
          </Box>
        </Stack>

        {/* Carousel */}
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            ref={emblaRef}
            sx={{
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
            {/* Track */}
            <Box
              sx={{
                display: "flex",
                touchAction: "pan-y pinch-zoom",
              }}
            >
              {articles.map((article) => (
                <Box
                  key={article.id}
                  sx={{
                    position: "relative",
                    flex: "0 0 100%",
                    minWidth: 0,
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
                      <Box
                        component="img"
                        src="/images/news/newsPic.webp"
                        alt={article.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      {/* Image overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.38) 100%)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Category */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: { xs: 16, md: 22 },
                          right: { xs: 16, md: 22 },
                          px: 1.5,
                          py: 0.7,
                          borderRadius: 2.5,
                          backgroundColor:
                            theme.palette.mode === "light"
                              ? "rgba(255,255,255,0.88)"
                              : "rgba(24,34,32,0.88)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          {article.categoryName}
                        </Typography>
                      </Box>
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
                          color: "text.secondary",
                        }}
                      >
                        <AccessTimeRoundedIcon
                          sx={{
                            fontSize: 17,
                            opacity: 0.75,
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            mx: "8px !important",
                          }}
                        />
                      </Stack>

                      {/* Title */}
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: {
                            xs: "1.4rem",
                            sm: "1.6rem",
                            md: "1.85rem",
                          },
                          lineHeight: 1.7,
                          fontWeight: "bold",
                          color: "text.primary",
                          mb: 1.5,
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {article.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.9rem",
                            md: "0.98rem",
                          },
                          lineHeight: 2,
                          color: "text.secondary",
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.summary}
                      </Typography>

                      {/* Button */}
                      <Box
                        component={Link}
                        href={`/news/${article.slug}`}
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
                          fontWeight: "bold",
                          transition:
                            "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
                          boxShadow: "0 8px 20px rgba(15,118,110,0.18)",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 25px rgba(15,118,110,0.25)",
                          },
                          "&:active": {
                            transform: "translateY(0)",
                          },
                        }}
                      >
                        مطالعه خبر
                        <ArrowBackRoundedIcon
                          sx={{
                            fontSize: 18,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Previous */}
          {articles.length > 1 && (
            <IconButton
              onClick={previousSlide}
              aria-label="خبر قبلی"
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: 10, md: 18 },
                transform: "translateY(-50%)",
                width: { xs: 38, md: 44 },
                height: { xs: 38, md: 44 },
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(24,34,32,0.9)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "text.primary",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                transition:
                  "transform 0.25s ease, color 0.25s ease, background-color 0.25s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#fff"
                      : theme.palette.background.paper,
                  color: "primary.main",
                  transform: "translateY(-50%) scale(1.08)",
                },
                "&:active": {
                  transform: "translateY(-50%) scale(0.95)",
                },
              }}
            >
              <ArrowForwardRoundedIcon />
            </IconButton>
          )}

          {/* Next */}
          {articles.length > 1 && (
            <IconButton
              onClick={nextSlide}
              aria-label="خبر بعدی"
              sx={{
                position: "absolute",
                top: "50%",
                right: { xs: 10, md: 18 },
                transform: "translateY(-50%)",
                width: { xs: 38, md: 44 },
                height: { xs: 38, md: 44 },
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(24,34,32,0.9)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "text.primary",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                transition:
                  "transform 0.25s ease, color 0.25s ease, background-color 0.25s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#fff"
                      : theme.palette.background.paper,
                  color: "primary.main",
                  transform: "translateY(-50%) scale(1.08)",
                },
                "&:active": {
                  transform: "translateY(-50%) scale(0.95)",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
          )}
        </Box>

        {/* Progress indicators */}
        {articles.length > 1 && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={0.8}
            sx={{
              mt: 3,
            }}
          >
            {articles.map((article, index) => {
              const isActive = index === activeIndex;

              return (
                <Box
                  key={article.id}
                  component="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`خبر ${index + 1}`}
                  sx={{
                    position: "relative",
                    border: 0,
                    padding: 0,
                    width: isActive ? 34 : 8,
                    height: 6,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                    transition:
                      "width 0.45s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "primary.dark"
                        : "text.secondary",
                    },

                    ...(isActive && {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundColor: theme.palette.primary.light,
                        transformOrigin: "right",
                        animation: `progress ${AUTOPLAY_DELAY}ms linear`,
                      },

                      "@keyframes progress": {
                        from: {
                          transform: "scaleX(0)",
                        },
                        to: {
                          transform: "scaleX(1)",
                        },
                      },
                    }),
                  }}
                />
              );
            })}
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
            fontWeight: "bold",
            transition: "gap 0.2s ease",
            "&:hover": {
              gap: 0.8,
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

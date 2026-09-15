import { Box, Container, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GrFormPrevious } from "react-icons/gr";
import { getArticleBySlug } from "@/services/articles.service";

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const response = await getArticleBySlug(params.slug);

  if (!response?.data) {
    notFound();
  }

  const news = response.data;

  return (
    <Box
      component="main"
      sx={{
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* ================= IMAGE ================= */}

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 3 },
          pt: { xs: 2, md: 4 },
        }}
      >
        <Box
          component="img"
          src={news.coverImageUrl || "/images/news/newsPic.webp"}
          alt={news.title}
          sx={{
            width: "100%",
            height: {
              xs: 260,
              sm: 400,
              md: 520,
            },
            objectFit: "cover",
            display: "block",
            borderRadius: { xs: 2.5, md: 4 },
            boxShadow: "0 20px 50px rgba(23, 33, 31, 0.12)",
          }}
        />
      </Box>

      {/* ================= ARTICLE ================= */}

      <Container maxWidth="md">
        <Stack
          spacing={3}
          sx={{
            pt: { xs: 4, md: 6 },
          }}
        >
          {/* Metadata */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            flexWrap="wrap"
          >
            <Box
              sx={{
                px: 1.5,
                py: 0.6,
                borderRadius: 1.5,
                bgcolor: "primary.light",
                color: "primary.dark",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginLeft: "12px !important",
              }}
            >
              {news.categoryName}
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              color="text.secondary"
            >
              <AccessTimeRoundedIcon sx={{ fontSize: 16 }} />

              <Typography variant="body2">مطالعه</Typography>
            </Stack>
          </Stack>

          {/* Title */}

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3.2rem",
              },
              fontWeight: 700,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
            }}
          >
            {news.title}
          </Typography>

          {/* Summary */}

          <Box
            sx={{
              position: "relative",
              px: 3,
              py: 2,
              borderRight: "3px solid",
              borderColor: "primary.main",
              bgcolor: "rgba(15, 118, 110, 0.035)",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },
                lineHeight: 2.1,
              }}
            >
              {news.summary}
            </Typography>
          </Box>
        </Stack>

        {/* ================= CONTENT ================= */}

        <Box
          sx={{
            mt: { xs: 6, md: 7 },
          }}
        >
          <Typography
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.95rem",
                md: "1rem",
              },
              lineHeight: 2.25,
              whiteSpace: "pre-wrap",
            }}
          >
            {news.content}
          </Typography>
        </Box>

        {/* ================= BACK ================= */}

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Stack
            component={Link}
            href="/news"
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              width: "fit-content",
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 600,

              transition: "color 0.2s ease",

              "&:hover": {
                color: "primary.dark",

                "& .back-icon": {
                  transform: "translateX(-5px)",
                },
              },
            }}
          >
            <GrFormPrevious
              className="back-icon"
              style={{
                width: "20px",
                height: "20px",
                rotate: "180deg",
                transition: "transform 0.3s ease",
              }}
            />

            <Typography component="span" fontWeight={600}>
              بازگشت به اخبار
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

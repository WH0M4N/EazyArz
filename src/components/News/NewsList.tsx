import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  slug: string;
  categoryName: string;
  summary: string;
  coverImageUrl: string;
};

type NewsListProps = {
  articles: { 
    data: Article[]
  }
};

export default function NewsList({ articles }: NewsListProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 9 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography component="h1" variant="h3" fontWeight={700}>
            اخبار
          </Typography>

          <Typography color="text.secondary">
            آخرین مطالب و اخبار دنیای ارزهای دیجیتال
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {articles?.data?.map((article) => (
            <Box
              key={article.id}
              component={Link}
              href={`/news/${article.slug}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,

                transition: "transform 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(23, 33, 31, 0.08)",

                  "& .news-arrow": {
                    transform: "translateX(-4px)",
                  },
                },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={article.coverImageUrl || "/images/news-placeholder.jpg"}
                alt={article.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Content */}
              <Box sx={{ p: 2.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  {article.categoryName}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    mt: 1,
                    mb: 1,
                    lineHeight: 1.7,
                  }}
                >
                  {article.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.summary}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 2.5 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    اخبار
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      color: "primary.main",
                      fontSize: "0.85rem",
                    }}
                  >
                    <Typography component="span" sx={{ fontSize: "inherit" }}>
                      مطالعه
                    </Typography>

                    <Box
                      className="news-arrow"
                      sx={{
                        display: "flex",
                        pt: "3px",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <ArrowBackRoundedIcon fontSize="small" />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

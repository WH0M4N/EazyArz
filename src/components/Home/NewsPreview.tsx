import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Link from "next/link";

const featuredArticle = {
  title: "آشنایی با ارزهای دیجیتال؛ از کجا باید شروع کنیم؟",
  excerpt:
    "اگر تازه وارد دنیای ارزهای دیجیتال شده‌اید، آشنایی با مفاهیم پایه می‌تواند اولین قدم برای شناخت بهتر این بازار باشد.",
  category: "آموزشی",
  date: "۲ شهریور ۱۴۰۵",
  readTime: "۵ دقیقه",
  image: "/images/news/crypto-intro.jpg",
  href: "/news/crypto-intro",
};

const articles = [
  {
    title: "بیت‌کوین چیست و چرا اهمیت دارد؟",
    category: "ارز دیجیتال",
    date: "۱ شهریور ۱۴۰۵",
    readTime: "۴ دقیقه",
    href: "/news/bitcoin",
  },
  {
    title: "تتر چیست و چه کاربردی دارد؟",
    category: "ارز دیجیتال",
    date: "۳۰ مرداد ۱۴۰۵",
    readTime: "۳ دقیقه",
    href: "/news/tether",
  },
  {
    title: "مفاهیم مهمی که قبل از سرمایه‌گذاری باید بدانید",
    category: "سرمایه‌گذاری",
    date: "۲۹ مرداد ۱۴۰۵",
    readTime: "۶ دقیقه",
    href: "/news/investing-basics",
  },
];

export default function NewsPreview() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              آخرین اخبار
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              مطالب و اخبار مهم دنیای ارز دیجیتال
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/news"
            endIcon={<ArrowBackRoundedIcon />}
            sx={{
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            مشاهده همه اخبار
          </Button>
        </Stack>

        {/* Content */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Featured article */}
          <Box
            component={Link}
            href={featuredArticle.href}
            sx={{
              flex: 1.3,
              minHeight: { xs: 380, md: 430 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              borderRadius: 3,
              textDecoration: "none",
              color: "#fff",
              bgcolor: "primary.dark",

              "&:hover .featured-image": {
                transform: "scale(1.04)",
              },
            }}
          >
            {/* Image */}
            <Box
              className="featured-image"
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${featuredArticle.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.4s ease",
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.05))",
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: "relative",
                p: { xs: 2.5, md: 3.5 },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "inline-block",
                  px: 1.2,
                  py: 0.5,
                  mb: 1.5,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {featuredArticle.category}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                {featuredArticle.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.9,
                  mb: 2,
                  maxWidth: 600,
                }}
              >
                {featuredArticle.excerpt}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.8rem",
                }}
              >
                <span>{featuredArticle.date}</span>

                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <AccessTimeRoundedIcon sx={{ fontSize: 15 }} />
                  <span>{featuredArticle.readTime}</span>
                </Stack>
              </Stack>
            </Box>
          </Box>

          {/* Smaller articles */}
          <Stack
            spacing={0}
            sx={{
              flex: 1,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            {articles.map((article) => (
              <Box
                key={article.href}
                component={Link}
                href={article.href}
                sx={{
                  display: "block",
                  p: 2.5,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background-color 0.2s ease",

                  "&:hover": {
                    bgcolor: "rgba(15, 118, 110, 0.04)",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  {article.category}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    mt: 0.75,
                    mb: 1,
                    lineHeight: 1.7,
                  }}
                >
                  {article.title}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  <span>{article.date}</span>

                  <span>•</span>

                  <span>{article.readTime}</span>
                </Stack>
              </Box>
            ))}

            <Divider />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

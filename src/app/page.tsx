import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box component="main">
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={3}
            alignItems="center"
            textAlign="center"
            sx={{
              maxWidth: 760,
              mx: "auto",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
                lineHeight: 1.3,
              }}
            >
              دنیای ارز دیجیتال را
              <br />
              ساده‌تر یاد بگیرید
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                lineHeight: 2,
                maxWidth: 600,
              }}
            >
              EasyArz به شما کمک می‌کند با اخبار، آموزش‌ها و اطلاعات کاربردی،
              دنیای ارز دیجیتال و سرمایه‌گذاری را بهتر بشناسید.
            </Typography>

            <Button
              variant="contained"
              size="large"
              href="/tutorials"
              sx={{
                px: 4,
                py: 1.5,
              }}
            >
              شروع یادگیری
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* About */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="md">
          <Stack spacing={2} textAlign="center">
            <Typography variant="h4">EasyArz چیست؟</Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 2,
              }}
            >
              یک مرجع ساده برای آشنایی با ارزهای دیجیتال، دنبال کردن اخبار بازار
              و یادگیری مفاهیم مرتبط با این حوزه.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Features */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Feature
              title="اخبار"
              description="آخرین اخبار و مطالب مهم مرتبط با بازار ارز دیجیتال."
              href="/news"
            />

            <Feature
              title="آموزش"
              description="ویدیوهای آموزشی برای یادگیری مفاهیم ارز دیجیتال و بازار."
              href="/tutorials"
            />

            <Feature
              title="قیمت‌ها"
              description="اطلاعات و قیمت ارزهای مختلف؛ به‌زودی در EasyArz."
            />
          </Stack>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h4">آماده شروع هستید؟</Typography>

            <Typography color="text.secondary">
              آموزش‌های EasyArz را شروع کنید و قدم‌به‌قدم با این حوزه آشنا شوید.
            </Typography>

            <Button variant="contained" href="/tutorials" size="large">
              مشاهده آموزش‌ها
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  href?: string;
}

function Feature({ title, description, href }: FeatureProps) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="h6">{title}</Typography>

        <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
          {description}
        </Typography>

        {href && (
          <Button
            href={href}
            sx={{
              alignSelf: "flex-start",
              px: 0,
            }}
          >
            مشاهده
          </Button>
        )}
      </Stack>
    </Box>
  );
}

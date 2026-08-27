import { Box, Container, Stack, Typography } from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";

const items = [
  {
    title: "اخبار",
    description: "از اتفاقات مهم بازار ارز دیجیتال باخبر باشید.",
    href: "/news",
    icon: NewspaperOutlinedIcon,
  },
  {
    title: "آموزش",
    description: "مفاهیم ارز دیجیتال را قدم‌به‌قدم یاد بگیرید.",
    href: "/tutorials",
    icon: SchoolOutlinedIcon,
  },
  {
    title: "قیمت ارزها",
    description: "مشاهده قیمت لحظه‌ای ارزها؛ به‌زودی.",
    href: "#markets",
    icon: TrendingUpOutlinedIcon,
  },
];

export default function QuickAccess() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            از کجا شروع کنیم؟
          </Typography>

          <Typography color="text.secondary">
            همه چیز را ساده و یکجا در اختیار شما قرار داده‌ایم.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} sx={{ gap: 2 }}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Box
                key={item.title}
                component={Link}
                href={item.href}
                sx={{
                  flex: 1,
                  textDecoration: "none",
                  color: "inherit",
                  p: 3,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      bgcolor: "rgba(37, 99, 235, 0.08)",
                      color: "primary.main",
                    }}
                  >
                    <Icon />
                  </Box>

                  <Typography variant="h6" fontWeight={600}>
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.9 }}
                  >
                    {item.description}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      color: "primary.main",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      alignItems: "center",
                    }}
                  >
                    <Typography>مشاهده</Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", pt: "5px" }}
                    >
                      <GrFormPrevious
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

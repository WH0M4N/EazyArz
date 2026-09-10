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
            هدف استارتاپ ما چیست؟{" "}
          </Typography>

          <Typography color="text.secondary">
            ایزی ارز با هدف هوشمند سازی افراد جامعه و به روز بودن از اخبار ،
            ارزش دارایی ها و ساخت سبدمالی به کمک هوش مصنوعی ایجاد شده است.
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
                  minHeight: 220,
                  display: "flex",
                  textDecoration: "none",
                  color: "inherit",
                  p: { xs: 2.5, md: 3 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "hidden",

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "primary.main",
                    boxShadow: "0 10px 30px rgba(23, 33, 31, 0.09)",

                    "& .quick-access-icon": {
                      transform: "scale(1.05)",
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                    },

                    "& .quick-access-arrow": {
                      transform: "translateX(-5px)",
                    },
                  },
                }}
              >
                <Stack
                  spacing={2}
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="quick-access-icon"
                    sx={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      bgcolor: "primary.light",
                      color: "primary.main",

                      transition:
                        "transform 0.25s ease, background-color 0.25s ease, color 0.25s ease",
                    }}
                  >
                    <Icon sx={{ fontSize: 25 }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.9,
                        maxWidth: 300,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>

                  {/* Link */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      color: "primary.main",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                      }}
                    >
                      مشاهده
                    </Typography>

                    <Box
                      className="quick-access-arrow"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pt: "4px",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      <GrFormPrevious
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
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

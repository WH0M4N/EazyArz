import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "—",
    change: "به‌زودی",
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: "—",
    change: "به‌زودی",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "—",
    change: "به‌زودی",
  },
];

export default function MarketPreview() {
  return (
    <Box
      component="section"
      id="markets"
      sx={{
        py: { xs: 7, md: 9 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              بازار ارز دیجیتال
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              قیمت‌های لحظه‌ای ارزها به‌زودی در دسترس خواهد بود.
            </Typography>
          </Box>

          <Chip
            label="به‌زودی"
            sx={{
              bgcolor: "rgba(37, 99, 235, 0.08)",
              color: "primary.main",
              fontWeight: 600,
            }}
          />
        </Stack>

        <Stack spacing={1.5}>
          {assets.map((asset) => (
            <Box
              key={asset.symbol}
              sx={{
                p: { xs: 2, sm: 2.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      bgcolor: "rgba(37, 99, 235, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  >
                    {asset.symbol}
                  </Box>

                  <Box>
                    <Typography fontWeight={600}>{asset.name}</Typography>

                    <Typography variant="caption" color="text.secondary">
                      {asset.symbol}
                    </Typography>
                  </Box>
                </Stack>

                <Stack alignItems="flex-end">
                  <Typography fontWeight={600}>{asset.price}</Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    <TrendingUpRoundedIcon fontSize="inherit" />
                    <span>{asset.change}</span>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

import { Box, Container, Typography } from "@mui/material";
import ArticleManager from "@/components/Admin/ArticleManager";

export default function AdminPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight={700}>
          پنل مدیریت
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          مدیریت محتوای ایزی ارز
        </Typography>

        <ArticleManager />
      </Box>
    </Container>
  );
}

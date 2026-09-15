import { Box, Container } from "@mui/material";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
}

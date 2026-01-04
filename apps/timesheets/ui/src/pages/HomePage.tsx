// src/pages/LoginPage.tsx
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 420, mx: "auto", overflow: "hidden" }}
      >
        <Header title={"Home"} />

        <Box sx={{ p: 3 }}>
          <Typography sx={{ mb: 3 }} color="text.secondary">
            Welcome to SchudulerLite - Timesheets
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/timesheets/new")}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

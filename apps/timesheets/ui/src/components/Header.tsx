// src/components/Header.tsx
import { Box, Typography } from "@mui/material";

import logo from "../assets/logo.png";

export const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "common.white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="SchedulerLite logo"
            sx={{ height: 80, width: 80, borderRadius: 1 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Timesheets from SchedulerLite
            </Typography>
          </Box>
        </Box>
        <Typography variant={"h6"}>{title}</Typography>
      </Box>
    </>
  );
};

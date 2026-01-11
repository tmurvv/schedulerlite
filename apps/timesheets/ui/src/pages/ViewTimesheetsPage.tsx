import ConstructionIcon from "@mui/icons-material/Construction";
import { Box, Paper, Typography } from "@mui/material";

export const ViewTimesheetsPage = () => (
    <Box
        sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            minHeight: "70vh",
            px: 2,
        }}
    >
        <Paper
            elevation={2}
            sx={{
                maxWidth: 520,
                px: 3,
                py: 4,
                textAlign: "center",
                width: "100%",
            }}
        >
            <ConstructionIcon sx={{ fontSize: 72, mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Coming soon!!
            </Typography>
            <Typography color="text.secondary">
                View Timesheets is under construction.
            </Typography>
        </Paper>
    </Box>
);

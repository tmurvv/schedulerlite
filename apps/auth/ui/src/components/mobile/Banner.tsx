import { Box, Typography } from "@mui/material";
import { colorScheme } from "../../constants/colors";

const sx = {
  mainContainer: {
    backgroundColor: colorScheme.veryDarkBlue,
    maxHeight: "25px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 2px",
    position: "relative",
    width: "150vw",
    color: "#fff",
  },
  logo: {
    height: "25px",
    flex: 1,
    width: "80px",
    marginRight: "10px",
  },
};

export const Banner = () => {
  return (
    <>
      <Box sx={sx.mainContainer}>
        <Box
          component="img"
          sx={sx.logo}
          alt={"Banner logo"}
          src={
            "/img/roof-only-ultimate-renovations_logo-rgb_-whitebg-300x182-1.png"
          }
        />
        <Typography
          // align={"right"}
          variant={"p"}
          sx={{ color: "#fff", flex: 9 }}
        >
          Ultimate Renovations Scheduler
        </Typography>
      </Box>
    </>
  );
};

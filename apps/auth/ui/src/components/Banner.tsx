import { Box, Typography } from "@mui/material";
import { colorScheme } from "../constants/colors";

const sx = {
  mainContainer: {
    backgroundColor: colorScheme.veryDarkBlue,
    maxHeight: "150px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 20px",
    position: "relative",
    width: "150vw",
    color: "#fff",
  },
  logo: {
    height: "150px",
    flex: 1,
    width: "250px",
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
          src={"/img/ultimate_renovations-white_logo.png"}
        />
        <Typography
          // align={"right"}
          variant={"h2"}
          sx={{ color: "#fff", flex: 9 }}
        >
          Ultimate Renovations
        </Typography>
      </Box>
    </>
  );
};

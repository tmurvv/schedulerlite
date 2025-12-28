import { Box, Typography } from "@mui/material";

type pageTitleProps = {
  mainTitle: string;
  subTitle: string;
};
const sx = {
  mainTitle: {
    textAlign: "center",
    margin: "auto",
    letterSpacing: "1.5px",
    fontSize: "24p",
  },
  subTitle: {
    width: "60%",
    margin: "auto",
    textAlign: "center",
    fontStyle: "italic",
    color: "#868686",
    letterSpacing: "1px",
    fontWeight: "500",
    fontSize: "14px",
    paddingTop: "10px",
  },
};

export const PageTitle: React.FC<pageTitleProps> = ({
  mainTitle,
  subTitle,
}) => (
  <>
    <Box sx={sx.mainTitle}>
      <Typography variant={"h3"}>{mainTitle}</Typography>
    </Box>
    <Box sx={sx.subTitle}>
      <Typography variant={"h5"}>{subTitle}</Typography>
    </Box>
  </>
);

import { Box, Typography } from "@mui/material";

const ReaderBadge = (props) => {
  const themeColor = props.themeColor;
  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        alignItems: "center",
        width: "140px",
        height: "140px",
        border: "10px solid white",
        borderRadius: "50%",
        padding: "2rem",
        boxShadow: "0 5px 15px #666",
        color: "white",
        backgroundColor: `${themeColor}`,
      }}
    >
      <Typography align="center" sx={{ color: "white" }}>
        {props.minutesRead} Minutes
      </Typography>
      <Typography align="center" variant="h4">
        {props.readerName}
      </Typography>
      <Typography align="center" sx={{ color: "white" }}>
        {props.coinsEarned} Coins
      </Typography>
    </Box>
  );
};

export default ReaderBadge;

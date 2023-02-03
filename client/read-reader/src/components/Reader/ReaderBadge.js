import { Box, Typography } from "@mui/material";

const ReaderBadge = (props) => {
  const themeColor = props.themeColor;
  const initials = [...props.readerName].splice(0, 2).join("");
  const capitalizedInitials =
    initials.charAt(0).toUpperCase() + initials.slice(1);
  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        alignItems: "center",
        justifySelf: "center",
        gap: "25px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          width: "140px",
          height: "140px",
          border: "10px solid white",
          borderRadius: "50%",
          padding: "2rem",
          boxShadow: "0px 11px 20px -1px rgba(0, 0, 0, 0.25)",
          color: "white",
          backgroundColor: `${themeColor}`,
        }}
      >
        {/* <Typography align="center" sx={{ color: "white" }}>
        {props.minutesRead} Minutes
      </Typography> */}
        <Typography align="center" component="span" variant="h1">
          {capitalizedInitials}
        </Typography>
        {/* <Typography align="center" sx={{ color: "white" }}>
        {props.coinsEarned} Coins
      </Typography> */}
      </Box>
      <Typography
        align="center"
        component="span"
        variant="h4"
        color={themeColor}
      >
        {props.readerName.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default ReaderBadge;

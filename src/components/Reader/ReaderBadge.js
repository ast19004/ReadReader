import { useContext } from "react";

import { Box, Typography } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import EditIcon from "@mui/icons-material/Edit";

import ReaderContext from "../../store/reader-contex";
import ScrollContext from "../../store/scroll-context";

const ReaderBadge = (props) => {
  const scrollCtx = useContext(ScrollContext);
  const readerCtx = useContext(ReaderContext);

  const themeColor = props.themeColor;
  const initials = [...props.readerName].splice(0, 2).join("");
  const capitalizedInitials =
    initials.charAt(0).toUpperCase() + initials.slice(1);

  const editReader = props.onEdit ? props.onEdit : () => {};
  const goToReaderHome = !readerCtx.currentReaderId
    ? props.onGoToReaderHome
    : () => {};
  const customCursor =
    props.onEdit || !readerCtx.currentReaderId ? "pointer" : "default";

  const readerNameColor =
    scrollCtx.offsetY > 140 && readerCtx.currentReaderId !== ""
      ? "white"
      : themeColor;
  const readerDetailsColor =
    scrollCtx.offsetY > 170 && readerCtx.currentReaderId !== ""
      ? "white"
      : themeColor;

  return (
    <Box
      className={props.className}
      component="div"
      sx={{
        display: "grid",
        alignItems: "center",
        justifySelf: "center",
        gap: "1rem",
        cursor: customCursor,
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
        onClick={goToReaderHome}
      >
        {/* <Typography align="center" sx={{ color: "white" }}>
        {props.minutesRead} Minutes
      </Typography> */}
        {props.readerName ? (
          <Typography
            align="center"
            component="span"
            sx={{
              fontFamily: '"Ultra", serif',
              fontSize: "4.2rem",
            }}
          >
            {capitalizedInitials}
          </Typography>
        ) : (
          <>
            <PersonAddIcon sx={{ justifySelf: "center", fontSize: "6rem" }} />
          </>
        )}
        {/* <Typography align="center" sx={{ color: "white" }}>
        {props.coinsEarned} Coins
      </Typography> */}
      </Box>
      <Typography
        align="center"
        component="span"
        variant="h4"
        color={readerNameColor}
        onClick={editReader}
      >
        {props.onEdit && (
          <EditIcon
            sx={{
              padding: "2px",
              border: "1px solid rgba(153, 153, 153, .5)",
              borderRadius: "50%",
            }}
          />
        )}
        <span>
          {!props.readerName ? "Add Reader" : props.readerName.toUpperCase()}
        </span>
      </Typography>
      {props.badgeData && (
        <Box
          sx={{
            justifySelf: "center",
            display: "grid",
            gridTemplateRows: "1fr",
            justifyContent: "space-between",
            color: readerDetailsColor,
            fontSize: "1.4rem",
          }}
        >
          {/* <span>{props.minutesRead} minutes</span> */}
          <span>{props.coinsEarned} points</span>
        </Box>
      )}
    </Box>
  );
};

export default ReaderBadge;

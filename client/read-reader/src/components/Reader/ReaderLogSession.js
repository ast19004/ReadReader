import domainPath from "../../domainPath";

import { useContext, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
// import CloseIcon from "@mui/icons-material/Close";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import styles from "./ReaderLogSession.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ReaderLogSession = (props) => {
  const history = useHistory();
  const params = useParams();
  const readerId = params.id;

  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const [error, setError] = useState("");
  const [isRecordingReading, setIsRecordingReading] = useState(false);
  const [readingStart, setReadingStart] = useState(new Date());

  // const [minutesRead, setMinutesRead] = useState(
  //   props.reader["total_reading_duration"]
  // );
  // const [coinsEarned, setCoinsEarned] = useState(props.reader["reading_coins"]);
  const [secondsCount, setSecondsCount] = useState(0);
  const [timer, setTimer] = useState();

  //set readerCtx to current Reader
  useEffect(() => {
    if (
      readerCtx.currentReaderId !== props.reader["_id"] ||
      readerCtx.currentReaderName !== props.reader["reader_name"] ||
      readerCtx.currentTheme !== props.reader["theme_color"]
    ) {
      readerCtx.onChangeReader(
        props.reader["_id"],
        props.reader["reader_name"],
        props.reader["theme_color"]
      );
    }
    // setMinutesRead(props.reader["total_reading_duration"]);
    // setCoinsEarned(props.reader["reading_coins"]);
  }, [readerCtx, props.reader]);

  const startCounter = useCallback(() => {
    const timer = setInterval(() => {
      setSecondsCount((prevCount) => prevCount + 1);
    }, 1000);
    setTimer(timer);
  }, [secondsCount]);

  const pauseCounter = () => {
    clearInterval(timer);
  };

  const stopCounter = () => {
    clearInterval(timer);
    setSecondsCount(0);
  };

  const currentReadingTime = `${
    Math.floor(secondsCount / 60) > 0 ? Math.floor(secondsCount / 60) : "0 0"
  } : ${secondsCount < 10 || secondsCount % 60 < 10 ? 0 : ""} ${
    secondsCount % 60 == 0
      ? "0"
      : secondsCount > 60
      ? secondsCount % 60
      : secondsCount
  } `;

  // const handleLogReadingCancel = () => {
  //   readerCtx.onChangeReader("", "", "");
  //   history.push(`/reader/${readerId}`);
  // };

  const fetchAddReaderSession = useCallback(
    async (minutesRead) => {
      const url = `${domainPath}/reader/session`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
        body: JSON.stringify({
          reader_id: readerId,
          reading_duration: minutesRead,
        }),
      };
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
    },
    [readerId, authCtx.token]
  );

  const handleReadingStatus = async () => {
    if (timer) {
      stopCounter();
    }

    if (!isRecordingReading) {
      setIsRecordingReading(true);
      setReadingStart(Date.now());
      startCounter();
    } else {
      setIsRecordingReading(false);
      //If reading recording finished, get total time and save session.
      const durationReadMillis = Date.now() - readingStart;
      const durationReadMinutes = Math.round(durationReadMillis / 1000 / 60);

      //If reading less than a minute, assume accidental session.
      if (durationReadMinutes < 1) {
        return;
      }
      //Allow parent component to react to reading end.
      props.onStopLogging();
      fetchAddReaderSession(durationReadMinutes).catch((error) =>
        setError(error)
      );
      readerCtx.onReaderIsUpdated();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gridGap: "2rem",
        margin: "0 auto",
        top: "75px",
        width: "100vw",
        height: "100vh",
        backgroundColor: props.reader["theme_color"],
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{ color: "white" }}
      >
        <b>{props.reader["reader_name"]}</b>
      </Typography>

      {/* {isRecordingReading && ( */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
          width: "250px",
          borderRadius: "50%",
          border: "12px solid white",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          align="center"
          sx={{ color: "white" }}
        >
          <b>
            {currentReadingTime}
            <br />
            <span
              style={{
                opacity: "0.7",
                fontSize: "2.5rem",
                letterSpacing: "2px",
              }}
            >
              minutes
            </span>
          </b>
        </Typography>
        <br />
      </Box>
      <Button
        className={styles.readingStatusButton}
        onClick={handleReadingStatus}
        variant="outlined"
        sx={{
          justifySelf: "center",
          backgroundColor: "white",
          color: `${readerCtx.currentTheme} `,
          borderColor: "white",
          borderRadius: "50%",
          height: "75px",
          width: "75px",
          "&:hover": {
            backgroundColor: `${readerCtx.currentTheme} `,
            border: "4px solid white",
            color: "white",
          },
          "@media(max-width: 450px)": { position: "fixed", bottom: "25px" },
        }}
      >
        {!isRecordingReading ? <PlayArrowIcon /> : <StopCircleIcon />}
      </Button>
    </Box>
  );
};

export default ReaderLogSession;

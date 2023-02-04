import domainPath from "../../domainPath";

import { useContext, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
// import CloseIcon from "@mui/icons-material/Close";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import ReaderBadge from "./ReaderBadge";

import styles from "./ReaderLogSession.module.css";

const ReaderLogSession = (props) => {
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
      readerCtx.currentReaderId !== props.reader["_id"] &&
      readerCtx.currentReaderName !== props.reader["reader_name"]
    ) {
      readerCtx.onChangeReader(
        props.reader["_id"],
        props.reader["reader_name"],
        props.reader["theme_color"]
      );
    }
  }, [readerCtx, props.reader]);

  const startCounter = useCallback(() => {
    const timer = setInterval(() => {
      setSecondsCount((prevCount) => prevCount + 1);
    }, 1000);
    setTimer(timer);
  }, [secondsCount]);

  const stopCounter = () => {
    clearInterval(timer);
    setSecondsCount(0);
  };

  const currentReadingTime = `${Math.floor(secondsCount / 60)} m : ${
    secondsCount < 10 || secondsCount % 60 < 10 ? 0 : ""
  } ${
    secondsCount % 60 == 0
      ? "0"
      : secondsCount > 60
      ? secondsCount % 60
      : secondsCount
  } s`;

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
      //Allow parent component to react reading end.
      props.onStopLogging();
      fetchAddReaderSession(durationReadMinutes).catch((error) =>
        setError(error)
      );
      readerCtx.onReaderIsUpdated();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridGap: "2rem",
          margin: "0 auto",
          marginTop: "-85px",
          maxWidth: "80%",

          "@media (min-width: 500px)": {
            gridTemplateColumns: "1fr 2fr",
            justifyContent: "center",
            marginTop: "-155px",
            maxWidth: "300px",
          },
        }}
      >
        <ReaderBadge
          // minutesRead={minutesRead}
          // coinsEarned={coinsEarned}
          readerName={props.reader["reader_name"]}
          themeColor={props.reader["theme_color"]}
        />
        {isRecordingReading && (
          <Box
            sx={{ gridRow: "2/3", justifySelf: "center", alignSelf: "center" }}
          >
            {currentReadingTime}
          </Box>
        )}
        <Button
          className={styles.readingStatusButton}
          onClick={handleReadingStatus}
          variant="outlined"
          sx={{
            gridRow: "3/4",
            color: `${readerCtx.currentTheme} `,
            border: `3px solid ${readerCtx.currentTheme} `,
            borderRadius: "25px",
          }}
        >
          {!isRecordingReading ? <PlayArrowIcon /> : <StopCircleIcon />}
        </Button>
      </Box>
    </>
  );
};

export default ReaderLogSession;

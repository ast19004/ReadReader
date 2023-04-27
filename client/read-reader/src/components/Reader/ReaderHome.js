// import domainPath from "../../domainPath";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import ReaderBadge from "./ReaderBadge";
import ReaderPrizeSelection from "../../components/Reader/ReaderPrizeSelection";

import styles from "./ReaderLogSession.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ReaderHome = (props) => {
  const params = useParams();
  const readerId = params.id;

  const history = useHistory();

  // const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const [error, setError] = useState("");
  // const [isRecordingReading, setIsRecordingReading] = useState(false);
  // const [readingStart, setReadingStart] = useState(new Date());

  const [minutesRead, setMinutesRead] = useState(
    props.reader["total_reading_duration"]
  );
  const [coinsEarned, setCoinsEarned] = useState(props.reader["reading_coins"]);
  // const [secondsCount, setSecondsCount] = useState(0);
  // const [timer, setTimer] = useState();

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
    setMinutesRead(props.reader["total_reading_duration"]);
    setCoinsEarned(props.reader["reading_coins"]);
  }, [readerCtx, props.reader]);

  // const startCounter = useCallback(() => {
  //   const timer = setInterval(() => {
  //     setSecondsCount((prevCount) => prevCount + 1);
  //   }, 1000);
  //   setTimer(timer);
  // }, [secondsCount]);

  // const stopCounter = () => {
  //   clearInterval(timer);
  //   setSecondsCount(0);
  // };

  // const currentReadingTime = `${Math.floor(secondsCount / 60)} m : ${
  //   secondsCount < 10 || secondsCount % 60 < 10 ? 0 : ""
  // } ${
  //   secondsCount % 60 == 0
  //     ? "0"
  //     : secondsCount > 60
  //     ? secondsCount % 60
  //     : secondsCount
  // } s`;

  // const fetchAddReaderSession = useCallback(
  //   async (minutesRead) => {
  //     const url = `${domainPath}/reader/session`;
  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: "Bearer " + authCtx.token,
  //       },
  //       body: JSON.stringify({
  //         reader_id: readerId,
  //         reading_duration: minutesRead,
  //       }),
  //     };
  //     const res = await fetch(url, requestOptions);

  //     if (!res.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const resData = await res.json();
  //   },
  //   [readerId, authCtx.token]
  // );

  // const handleReadingStatus = async () => {
  //   if (timer) {
  //     stopCounter();
  //   }

  //   if (!isRecordingReading) {
  //     setIsRecordingReading(true);
  //     setReadingStart(Date.now());
  //     startCounter();
  //   } else {
  //     setIsRecordingReading(false);
  //     //If reading recording finished, get total time and save session.
  //     const durationReadMillis = Date.now() - readingStart;
  //     const durationReadMinutes = Math.round(durationReadMillis / 1000 / 60);

  //     //If reading less than a minute, assume accidental session.
  //     if (durationReadMinutes < 1) {
  //       return;
  //     }
  //     //Allow parent component to react reading end.
  //     props.onStopLogging();
  //     fetchAddReaderSession(durationReadMinutes).catch((error) =>
  //       setError(error)
  //     );
  //     readerCtx.onReaderIsUpdated();
  //   }
  // };

  // const handleStartLogReading = (e) => {
  //   e.preventDefault();
  //   history.push(`reader/${readerId}/log`);
  // };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          display: "grid",
          gridGap: "2rem",
          margin: "0 auto",
          top: "75px",
          // maxWidth: "80%",

          // "@media (min-width: 500px)": {
          //   justifyContent: "center",
          // },
        }}
      >
        <ReaderBadge
          badgeData={true}
          minutesRead={minutesRead}
          coinsEarned={coinsEarned}
          readerName={props.reader["reader_name"]}
          themeColor={props.reader["theme_color"]}
        />

        <ReaderPrizeSelection
          readerId={readerId}
          readerName={props.reader["reader_name"]}
          theme={props.reader["theme_color"]}
        />
      </Box>
      <Box
        sx={{
          position: "fixed",
          zIndex: "999",
          bottom: "-5px",
          background:
            "linear-gradient(to top, white, rgba(255,255,255,0.8) 95%, rgba(255,255,255,0))",
          width: "100vw",
          height: "95px",
        }}
      ></Box>
      <Button
        className={styles.readingStatusButton}
        onClick={() => {
          history.push(`/reader/${readerId}/log/`);
        }}
        variant="outlined"
        sx={{
          position: "fixed",
          zIndex: "10000",
          bottom: "-5px",
          left: `calc(50vw - 32.5px)`,
          width: "80px",
          height: "80px",
          color: "white",
          backgroundColor: `${readerCtx.currentTheme} `,
          border: "5px solid white",
          borderRadius: "35px 35px 0 0",
          boxShadow: "2px -1px 8px #888888;",
          "&:hover": {
            backgroundColor: "white",
            color: `${readerCtx.currentTheme} `,
            border: `5px solid ${readerCtx.currentTheme} `,
          },
        }}
      >
        <PlayArrowIcon fontSize="large" />
      </Button>
    </>
  );
};

export default ReaderHome;

import { useContext, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CloseIcon from "@mui/icons-material/Close";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import ReaderBadge from "./ReaderBadge";

import styled from "styled-components";

const ReaderLogSession = (props) => {
  const history = useHistory();
  const params = useParams();
  const readerId = params.id;

  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const [error, setError] = useState("");
  const [isRecordingReading, setIsRecordingReading] = useState(false);
  const [readingStart, setReadingStart] = useState(new Date());

  const [secondsCount, setSecondsCount] = useState(0);
  const [timer, setTimer] = useState();

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

  const onChangeReader = (id, name) => {
    readerCtx.onChangeReaderId(id);
    readerCtx.onChangeReaderName(name);
  };

  const handleLogReadingCancel = () => {
    onChangeReader("", "");
    history.push(`/reader/${readerId}`);
  };

  const fetchAddReaderSession = useCallback(
    async (minutesRead) => {
      const url = "http://localhost:5000/reader/session";
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
    }
  };

  return (
    <>
      <LogReadingContainer>
        <ReaderBadge
          minutesRead={props.minutesRead}
          coinsEarned={props.coinsEarned}
          readerName={props.readerName}
        />
        {!isRecordingReading ? (
          <Button
            onClick={handleLogReadingCancel}
            variant="outlined"
            sx={{ gridRow: "2/3" }}
          >
            <CloseIcon />
          </Button>
        ) : (
          <TimerBox>{currentReadingTime}</TimerBox>
        )}
        <Button
          onClick={handleReadingStatus}
          variant="outlined"
          sx={{ gridColumn: "2/-1", gridRow: "2/3" }}
        >
          {!isRecordingReading ? <PlayArrowIcon /> : <StopCircleIcon />}
        </Button>
      </LogReadingContainer>
    </>
  );
};

export default ReaderLogSession;

const LogReadingContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 80%;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 2fr;
    justify-content: center;
    margin-top: 6rem;
    max-width: 300px;
  }
`;

const TimerBox = styled.div`
  grid-row: 2/3;
  justify-self: center;
  align-self: center;
`;

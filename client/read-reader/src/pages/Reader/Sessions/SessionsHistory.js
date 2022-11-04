import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import Session from "./Session";

import styled from "styled-components";

function SessionsHistory(props) {
  const [readerSessions, setReaderSessions] = useState([]);
  const [error, setError] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const [hasSessions, setHasSessions] = useState(false);

  const hasNoSessionsText = "No history yet!";

  //Get all reader sessions from server using reader id
  useEffect(() => {
    const url = "http://localhost:5000/reader/" + props.readerId + "/sessions";
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + props.token,
      },
    };
    const fetchReader = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      const loadedSessions = resData.sessions;

      setReaderSessions(loadedSessions);
      setHasSessions(loadedSessions.length !== 0);
    };
    fetchReader().catch((err) => setError(err.msg));
  }, [props.token, props.readerId, updateCount]);

  const handleSessionUpdate = () => {
    setUpdateCount((prevCount) => (prevCount += 1));
  };

  return (
    <>
      {hasSessions ? (
        <SessionsList>
          {readerSessions.map((session) => (
            <Session
              key={session._id}
              id={session._id}
              readerId={session["reader_id"]}
              date={session["session_date"]}
              minutesRead={session["reading_duration"]}
              onUpdate={handleSessionUpdate}
            />
          ))}
        </SessionsList>
      ) : (
        <Typography
          align="center"
          variant="h5"
          component="p"
          sx={{ color: "gray", marginTop: "2rem" }}
        >
          {hasNoSessionsText}
        </Typography>
      )}
    </>
  );
}

export default SessionsHistory;

const SessionsList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  grid-gap: 1rem;

  /* @media (min-width: 800px) {
    grid-template-columns: auto auto;
    justify-content: space-evenly;
  } */
`;

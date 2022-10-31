import { useState, useEffect } from "react";

import Session from "./Session";

import styled from "styled-components";

function SessionsHistory(props) {
  const [readerSessions, setReaderSessions] = useState([]);
  const [error, setError] = useState("");

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
    };
    fetchReader().catch((err) => setError(err.msg));
  }, [props.token, props.readerId]);

  return (
    <SessionsList>
      {readerSessions.map((session) => (
        <Session
          key={session._id}
          id={session._id}
          readerId={session["reader_id"]}
          date={session["session_date"]}
          minutesRead={session["reading_duration"]}
        />
      ))}
    </SessionsList>
  );
}

export default SessionsHistory;

const SessionsList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  grid-gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: auto auto;
    justify-content: space-evenly;
  }
`;

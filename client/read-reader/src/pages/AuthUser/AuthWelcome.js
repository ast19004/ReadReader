import { useState, useContext, useEffect } from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import ReaderBadgeLink from "../../components/Reader/ReaderBadgeLink";

import { Typography } from "@mui/material";
import { Person, PersonAdd, ArrowRightAlt } from "@mui/icons-material";

import styled from "styled-components";

const AuthWelcome = () => {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);
  const [error, setError] = useState("");

  const [readers, setReaders] = useState([]);

  const [userHasReader, setUserHasReaders] = useState(false);

  //set readerCtx to mainUser
  useEffect(() => {
    if (
      readerCtx.currentReaderId !== "" &&
      readerCtx.currentReaderName !== ""
    ) {
      readerCtx.onChangeReaderId("");
      readerCtx.onChangeReaderName("");
    }
  }, [readerCtx]);

  useEffect(() => {
    const url = "http://localhost:5000/readers";
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };

    const fetchReaderData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      const loadedReaders = resData.readers.map((reader) => {
        return {
          id: reader["_id"],
          name: reader["reader_name"],
          minutesRead: reader["total_reading_duration"],
          coinsEarned: reader["reading_coins"],
        };
      });
      setReaders(loadedReaders);
      setUserHasReaders(loadedReaders.length !== 0);
    };

    fetchReaderData().catch((err) => {
      setError(err.msg);
    });
  }, [authCtx.token, readerCtx.isUpdated]);

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Readers
      </Typography>
      {!error && userHasReader && (
        <ReaderBadgesContainer>
          {readers.map((reader) => {
            return (
              <ReaderBadgeLink
                key={reader.id}
                id={reader.id}
                minutesRead={reader.minutesRead}
                coinsEarned={reader.coinsEarned}
                readerName={reader.name}
              />
            );
          })}
        </ReaderBadgesContainer>
      )}
      {!error && !userHasReader && (
        <>
          <Typography
            align="center"
            variant="h4"
            component="p"
            sx={{ color: "gray", marginTop: "2rem" }}
          >
            Please add reader(s) to begin.
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "gray",
              marginTop: "1rem",
            }}
          >
            <Person /> <ArrowRightAlt /> <PersonAdd />
            &nbsp;Add Reader
          </Typography>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default AuthWelcome;

const ReaderBadgesContainer = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 5rem;
  justify-content: center;
  align-content: center;
  margin-top: 5rem;
  margin-bottom: 1rem;

  @media (min-width: 500px) {
    grid-template-columns: auto auto;
  }
  @media (min-width: 850px) {
    grid-template-columns: auto auto auto;
  }
`;

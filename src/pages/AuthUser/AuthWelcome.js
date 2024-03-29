import domainPath from "../../domainPath";
import { useState, useContext, useEffect } from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import ReaderBadgeLink from "../../components/Reader/ReaderBadgeLink";

import AddReader from "../Reader/AddReader";

import { Typography } from "@mui/material";
import { Person, PersonAdd, ArrowRightAlt } from "@mui/icons-material";

import styled from "styled-components";
import { Box } from "@mui/system";

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
      readerCtx.onChangeReader("", "", "");
    }
  }, [readerCtx]);

  useEffect(() => {
    const url = `${domainPath}/readers`;
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
          themeColor: reader["theme_color"],
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
      {!error && (
        <>
          <Typography
            align="center"
            component="h1"
            sx={{
              fontSize: "40px",
              color: "rgba(0,0,0, 0.38)",
              marginTop: "5.5rem",
              marginBottom: "2.2rem",
            }}
          >
            Reader Progress
          </Typography>
          <ReaderBadgesContainer>
            {userHasReader &&
              readers.map((reader) => {
                return (
                  <ReaderBadgeLink
                    key={reader.id}
                    id={reader.id}
                    readerName={reader.name}
                    minutesRead={reader.minutesRead}
                    coinsEarned={reader.coinsEarned}
                    themeColor={reader.themeColor}
                  />
                );
              })}
            <ReaderBadgeLink
              key={"addReader"}
              id={""}
              readerName={""}
              minutesRead={0}
              coinsEarned={0}
              themeColor={"#2779A7"}
            />
          </ReaderBadgesContainer>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default AuthWelcome;

const ReaderBadgesContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 224px);
  grid-gap: 5rem;
  justify-content: center;
  align-content: center;
  margin-bottom: 1rem;
`;

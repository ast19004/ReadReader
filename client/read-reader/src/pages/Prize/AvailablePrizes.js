import { useEffect, useState, useContext } from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import styled from "styled-components";
import Prize from "../../components/Prize/Prize";

import { Typography } from "@mui/material";
import { Person, ArrowRightAlt } from "@mui/icons-material";
import AddPrizeIcon from "../../components/Prize/AddPrizeIcon";

const AvailablePrizes = (props) => {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const isMainUser = !readerCtx.currentReaderId;

  const [error, setError] = useState("");

  const [prizes, setPrizes] = useState([]);

  const [hasPrizes, setHasPrizes] = useState(false);

  const hasNoPrizeText = isMainUser
    ? "You have not yet created any prizes."
    : "Ask your parent to create prizes you can earn.";

  useEffect(() => {
    const url = isMainUser
      ? `http://localhost:5000/prizes/`
      : `http://localhost:5000/reader/${props.readerId}/prizes/available`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const fetchPrizesData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      const loadedPrizes = resData.prizes;
      setPrizes(loadedPrizes);
      setHasPrizes(loadedPrizes.length !== 0);
    };

    fetchPrizesData().catch((err) => setError(err.message));
  }, [authCtx.token, props.readerId, isMainUser]);

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Prizes
      </Typography>
      {hasPrizes ? (
        <>
          {props.children && props.children}
          <PrizesWrapper>
            {prizes.map((prize) => (
              <Prize
                key={prize._id}
                prizeName={prize.prize_name}
                readingRequirement={prize.reading_requirement}
                earnedCoins={props.earnedCoins}
              />
            ))}
          </PrizesWrapper>
        </>
      ) : (
        <>
          <Typography
            align="center"
            variant="h4"
            component="p"
            sx={{ color: "gray", marginTop: "2rem" }}
          >
            {hasNoPrizeText}
          </Typography>

          {isMainUser && (
            <>
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
                <Person fontSize="medium" /> <ArrowRightAlt />
                &nbsp;
                <AddPrizeIcon fontSize="medium" />
                Add Prize
              </Typography>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AvailablePrizes;

const PrizesWrapper = styled.ul`
  display: grid;
  grid-gap: 4rem;
  padding: 4rem;
  justify-content: center;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media (min-width: 760px) {
    grid-template-columns: repeat(3, 200px);
  }
`;

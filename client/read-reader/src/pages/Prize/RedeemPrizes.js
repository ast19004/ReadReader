import domainPath from "../../domainPath";
import { useEffect, useState, useContext } from "react";

import AuthContext from "../../store/auth-contex";
import PrizeContext from "../../store/prize-context";

import styled from "styled-components";
import Prize from "../../components/Prize/Prize";

import { Typography } from "@mui/material";

const RedeemPrizes = (props) => {
  const authCtx = useContext(AuthContext);
  const prizeCtx = useContext(PrizeContext);

  const readerId = props.readerId;

  const [error, setError] = useState("");

  const [prizes, setPrizes] = useState([]);

  const [hasPrizes, setHasPrizes] = useState(false);

  const hasNoEarnedPrizeText = "None";

  useEffect(() => {
    const url = `${domainPath}/reader/${readerId}/prizes/earned`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const fetchEarnedPrizesData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      const loadedPrizes = resData.prizes;
      setPrizes(loadedPrizes);
      setHasPrizes(loadedPrizes.length !== 0);
    };

    fetchEarnedPrizesData().catch((err) => setError(err.message));
  }, [authCtx.token, readerId, prizeCtx.isUpdated]);

  return (
    <>
      {hasPrizes ? (
        <PrizesWrapper>
          {prizes.map((prize) => (
            <Prize
              key={prize._id}
              id={prize._id}
              prizeName={prize.prize_name}
              readingRequirement={prize.reading_requirement}
              earnedCoins={props.earnedCoins}
              redeem={true}
            />
          ))}
        </PrizesWrapper>
      ) : (
        <>
          <Typography
            align="center"
            variant="h5"
            component="p"
            sx={{ color: "gray", marginTop: "2rem" }}
          >
            {hasNoEarnedPrizeText}
          </Typography>
        </>
      )}
    </>
  );
};

export default RedeemPrizes;

const PrizesWrapper = styled.ul`
  display: grid;
  grid-gap: 4rem;
  padding: 4rem;
  justify-content: center;
`;

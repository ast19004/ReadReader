import { useEffect, useState, useContext, useCallback } from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";
import PrizeContext from "../../store/prize-context";

import styled from "styled-components";
import Prize from "../../components/Prize/Prize";

import { Typography } from "@mui/material";
import { Person, ArrowRightAlt } from "@mui/icons-material";
import AddPrizeIcon from "../../components/Prize/AddPrizeIcon";
import EditPrizeModal from "../../components/UI/EditPrizeModal";
import DeletePrizeModal from "../../components/UI/DeletePrizeModal";

const AvailablePrizes = (props) => {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);
  const prizeCtx = useContext(PrizeContext);

  const isMainUser = useCallback(() => {
    return !readerCtx.currentReaderId;
  }, [readerCtx.currentReaderId]);

  const hasNoPrizeText = isMainUser()
    ? "You have not yet created any prizes."
    : "Ask your parent to create prizes you can earn.";

  const [error, setError] = useState("");

  const [prizes, setPrizes] = useState([]);

  const [hasPrizes, setHasPrizes] = useState(false);

  const [prizeId, setPrizeId] = useState(0);
  const [edit, setEdit] = useState(false);

  const [deletePrize, setDeletePrize] = useState(false);
  const [prizeName, setPrizeName] = useState("");

  //set readerCtx to current user
  useEffect(() => {
    if (props.readerName) {
      readerCtx.onChangeReaderId(props.readerId);
      readerCtx.onChangeReaderName(props.readerName);
    } else {
      readerCtx.onChangeReaderId("");
      readerCtx.onChangeReaderName("");
    }
  }, [props.readerId, props.readerName]);

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
  }, [authCtx.token, props.readerId, isMainUser, prizeCtx.isUpdated]);

  const handleOpenEditPrize = (prizeId) => {
    setPrizeId(prizeId);
    setEdit(true);
  };
  const handleCloseEditPrize = () => {
    setEdit(false);
  };
  const handleOpenDeletePrize = (prizeId, prizeName) => {
    setPrizeId(prizeId);
    setPrizeName(prizeName);
    setDeletePrize(true);
  };

  const handleCloseDeletePrize = (isUpdated = false) => {
    if (isUpdated) {
      prizeCtx.onPrizeIsUpdated();
    }
    setDeletePrize(false);
  };

  return (
    <>
      <EditPrizeModal
        open={edit}
        onClose={handleCloseEditPrize}
        prizeId={prizeId}
      />
      <DeletePrizeModal
        open={deletePrize}
        onClose={handleCloseDeletePrize}
        prizeId={prizeId}
        prizeName={prizeName}
      />
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
                id={prize._id}
                prizeName={prize.prize_name}
                readingRequirement={prize.reading_requirement}
                earnedCoins={props.earnedCoins}
                onEdit={handleOpenEditPrize}
                onDelete={handleOpenDeletePrize}
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

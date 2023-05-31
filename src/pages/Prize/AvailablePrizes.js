import domainPath from "../../domainPath";
import { useEffect, useState, useContext, useCallback } from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";
import PrizeContext from "../../store/prize-context";

import styled from "styled-components";
import Prize from "../../components/Prize/Prize";
import AddPrize from "../Prize/AddPrize";

import { Typography } from "@mui/material";
import { Person, ArrowRightAlt } from "@mui/icons-material";
import AddPrizeIcon from "../../components/Prize/AddPrizeIcon";
import EditPrizeModal from "../../components/UI/EditPrizeModal";
import DeletePrizeModal from "../../components/UI/DeletePrizeModal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box } from "@mui/system";

const AvailablePrizes = (props) => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);
  const prizeCtx = useContext(PrizeContext);

  const isMainUser = !params.id;

  const hasNoPrizeText = isMainUser
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
      readerCtx.onChangeReader(props.readerId, props.readerName, props.theme);
    } else {
      readerCtx.onChangeReader("", "", "");
    }
  }, [props.readerId, props.readerName, props.theme]);

  useEffect(() => {
    const url = isMainUser
      ? `${domainPath}/prizes/`
      : `${domainPath}/reader/${props.readerId}/prizes/available`;
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
    <Box sx={props.sx}>
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
      {/* <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Prizes
      </Typography> */}
      {hasPrizes ? (
        <>
          {props.children && props.children}
          <PrizesWrapper>
            {prizes.map((prize) => (
              <Prize
                key={prize._id}
                id={prize._id}
                prize={prize}
                earnedCoins={props.earnedCoins}
                onEdit={handleOpenEditPrize}
                onDelete={handleOpenDeletePrize}
              />
            ))}
          </PrizesWrapper>
        </>
      ) : (
        <>
          {!isMainUser ? (
            <Typography
              align="center"
              variant="h4"
              component="p"
              sx={{ color: "gray", marginTop: "2rem" }}
            >
              {hasNoPrizeText}
            </Typography>
          ) : (
            <AddPrize />
          )}
        </>
      )}
    </Box>
  );
};

export default AvailablePrizes;

const PrizesWrapper = styled.ul`
  position: relative;
  display: flex;
  gap: 4rem;
  justify-content: center;
  flex-flow: row wrap;
  margin: 0 4% 100px 4%;
`;

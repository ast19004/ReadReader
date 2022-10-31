import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ReaderContext from "../../store/reader-contex";
import AuthContext from "../../store/auth-contex";

import { Button, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectedIcon from "@mui/icons-material/CheckBox";
import RedeemIcon from "@mui/icons-material/Redeem";

import styled from "styled-components";

const Prize = (props) => {
  const history = useHistory();

  const readerCtx = useContext(ReaderContext);
  const authCtx = useContext(AuthContext);

  const isMainUser = !readerCtx.currentReaderId;

  const [isLocked, setIsLocked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const listContainerStyle = {
    display: "grid",
    height: "150px",
    width: "200px",
    listStyle: "none",
    padding: "5px",
  };
  isMainUser && !isLocked
    ? (listContainerStyle.cursor = "pointer")
    : (listContainerStyle.cursor = "default");

  //If reader coins < prize, prize is locked
  useEffect(() => {
    if (props.earnedCoins) {
      setIsLocked(props.earnedCoins < props.readingRequirement);
    }
  }, [props.earnedCoins, props.readingRequirement]);

  //If prize in one reader has earned set as selected
  useEffect(() => {
    if (isMainUser) {
      return;
    }
    const url = "http://localhost:5000/reader/" + readerCtx.currentReaderId;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const fetchReaderPrizes = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      const loadedReader = resData.reader;
      const earnedReaderPrizes = loadedReader.reader_prizes.map(
        (reader) => reader.prizeId
      );
      if (earnedReaderPrizes.includes(props.id)) {
        setIsSelected(true);
      }
    };
    fetchReaderPrizes().catch((err) => console.log(err.message));
  }, [isMainUser, readerCtx.currentReaderId, authCtx.token, props.id]);

  const handleAddPrizeToReader = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const url = `http://localhost:5000/prize/${props.id}/${readerCtx.currentReaderId}`;

    try {
      await fetch(url, requestOptions);
    } catch (err) {
      console.log(err);
    }
    setIsSelected(true);
    setIsLocked(false);
  };

  const handleRemovePrizeFromReader = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const url = `http://localhost:5000/prize/${props.id}/${readerCtx.currentReaderId}/delete`;

    try {
      await fetch(url, requestOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdatePrizeHandler = () => {
    //TODO: change route
    history.push(`/`);
  };

  return (
    <li id={props.id} style={listContainerStyle}>
      {isSelected && (
        <UnlockedStyle>
          <li>
            <Tooltip title="Get prize from your adult">
              <SelectedIcon fontSize="large" color="action" />
            </Tooltip>
          </li>
        </UnlockedStyle>
      )}
      {isLocked && !isSelected && (
        <LockedStyle>
          <li>
            <LockIcon fontSize="large" />
          </li>
        </LockedStyle>
      )}
      {!isLocked && !isMainUser && !isSelected && (
        <UnlockedStyle>
          <li>
            <Tooltip title="Select Prize">
              <Button onClick={handleAddPrizeToReader}>
                <AddCircleIcon fontSize="large" />
              </Button>
            </Tooltip>
          </li>
        </UnlockedStyle>
      )}

      {isMainUser && !props.redeem && (
        <UnlockedStyle>
          <li
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "70px",
              gridColumn: 2 / -1,
              alignSelf: "end",
              marginBottom: "1rem",
            }}
          >
            <Tooltip title="Delete Prize">
              <Button>
                <DeleteIcon color="action" />
              </Button>
            </Tooltip>
            <Tooltip title="Edit Prize">
              <Button>
                <EditIcon onClick={handleUpdatePrizeHandler} color="action" />
              </Button>
            </Tooltip>
          </li>
        </UnlockedStyle>
      )}
      {isMainUser && props.redeem && (
        <Tooltip title="Remove Claimed Prize">
          <Button onClick={handleRemovePrizeFromReader}>
            <RedeemIcon />
          </Button>
        </Tooltip>
      )}
      <ul style={{ position: "absolute", zIndex: 1, padding: "10px" }}>
        <li>{props.prizeName}</li>
        <li>{props.readingRequirement}</li>
      </ul>
    </li>
  );
};

export default Prize;

const LockedStyle = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  height: 150px;
  width: 200px;
  background-color: rgba(125, 125, 125, 0.3);
  border-radius: 5px;
`;

const UnlockedStyle = styled(LockedStyle)`
  background-color: rgba(200, 200, 200, 0.2);
  border: 1px solid rgba(125, 125, 125, 0.3);
`;

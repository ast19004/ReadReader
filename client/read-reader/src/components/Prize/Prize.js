import domainPath from "../../domainPath";
import { useState, useContext, useEffect } from "react";

import ReaderContext from "../../store/reader-contex";
import AuthContext from "../../store/auth-contex";
import PrizeContext from "../../store/prize-context";

import { Box, Button, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectedIcon from "@mui/icons-material/CheckBox";
import RedeemIcon from "@mui/icons-material/Redeem";

import styled from "styled-components";
import defaultPrizeImg from "../../assets/Prize/prize.svg";

const Prize = (props) => {
  const readerCtx = useContext(ReaderContext);
  const authCtx = useContext(AuthContext);
  const prizeCtx = useContext(PrizeContext);

  const isMainUser = !readerCtx.currentReaderId;

  const [isLocked, setIsLocked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const prizeImagePath =
    props.prize.prize_image === ""
      ? defaultPrizeImg
      : `/images/uploads/${props.prize.prize_image}`;

  const listContainerStyle = {
    display: "grid",
    height: "350px",
    width: "350px",
    listStyle: "none",
    padding: "5px",
    border: "1px solid rgba(230, 230, 230)",
    borderRadius: "15px",
  };
  isMainUser && !isLocked
    ? (listContainerStyle.cursor = "pointer")
    : (listContainerStyle.cursor = "default");

  //If reader coins < prize, prize is locked
  //Set prize % bars based on earned points
  useEffect(() => {
    if (props.earnedCoins) {
      setIsLocked(props.earnedCoins < props.prize["reading_requirement"]);
    }
    if (props.earnedCoins === 0) {
      setPercentage(0);
    } else if (props.earnedCoins < props.prize["reading_requirement"]) {
      setPercentage(
        Math.floor(
          (props.earnedCoins / props.prize["reading_requirement"]) * 100
        )
      );
    } else {
      setPercentage(100);
    }
  }, [props.earnedCoins, props.prize]);

  //If prize in one reader has earned set as selected
  useEffect(() => {
    if (isMainUser) {
      return;
    }
    const url = `${domainPath}/reader/${readerCtx.currentReaderId}`;
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
  }, [
    isMainUser,
    readerCtx.currentReaderId,
    authCtx.token,
    prizeCtx.isUpdated,
    props.id,
  ]);

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
    const url = `${domainPath}/prize/${props.id}/${readerCtx.currentReaderId}`;

    try {
      await fetch(url, requestOptions);
      prizeCtx.onPrizeIsUpdated();
      readerCtx.onReaderIsUpdated();
    } catch (err) {
      console.log(err);
    }
    setIsSelected(true);
    setIsLocked(false);
  };

  const handleDeletePrizeFromReader = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };

    const url = `${domainPath}/prize/${props.id}/${readerCtx.currentReaderId}/delete`;

    try {
      await fetch(url, requestOptions);
    } catch (err) {
      console.log(err);
    }
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
              gridGap: "25px",
              gridColumn: 2 / -1,
              alignSelf: "start",
              marginBottom: "1rem",
            }}
          >
            <Tooltip title="Delete Prize">
              <Button>
                <DeleteIcon
                  onClick={() => {
                    props.onDelete(props.id, props.prize.prize_name);
                  }}
                  color="action"
                />
              </Button>
            </Tooltip>
            <Tooltip title="Edit Prize">
              <Button>
                <EditIcon
                  onClick={() => {
                    props.onEdit(props.id);
                  }}
                  color="action"
                />
              </Button>
            </Tooltip>
          </li>
        </UnlockedStyle>
      )}
      {isMainUser && props.redeem && (
        <UnlockedStyle>
          <Tooltip title="Remove Claimed Prize">
            <Button onClick={handleDeletePrizeFromReader}>
              <RedeemIcon />
            </Button>
          </Tooltip>
        </UnlockedStyle>
      )}
      <ul
        style={{
          position: "relative",
          zIndex: 1,
          padding: "10px",
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <li>
          <b>{props.prize.prize_name}</b>
        </li>
        <li>
          <img
            src={prizeImagePath}
            alt={props.prize.prize_name}
            style={{ maxWidth: "100%" }}
          />
        </li>
        {!isMainUser && (
          <li>
            <ul style={{ display: "grid", gridTemplateRows: "25px 25px" }}>
              <Box sx={{ position: "relative" }}>
                <TimeBar />
                {percentage !== 0 && (
                  <TimeBar
                    style={{
                      backgroundColor: `${readerCtx.currentTheme}`,
                      width: isSelected ? "100%" : `${percentage}%`,
                    }}
                  />
                )}
              </Box>
              <li style={{ justifySelf: "end" }}>
                <b>{props.prize.reading_requirement}</b> points
              </li>
            </ul>
          </li>
        )}
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
  height: 350px;
  width: 350px;
  border-radius: 5px;
`;

const UnlockedStyle = styled(LockedStyle)`
  /* border: 1px solid rgba(125, 125, 125, 0.3); */
`;
const TimeBar = styled.li`
  position: absolute;
  width: 100%;
  height: 15px;
  background-color: rgb(175, 175, 175, 0.4);
  border: 1px solid rgb(175, 175, 175, 0.8);
  border-radius: 15px;
`;

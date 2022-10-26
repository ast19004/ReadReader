import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ReaderContext from "../../store/reader-contex";

import { Button, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

const Prize = (props) => {
  const history = useHistory();

  const readerCtx = useContext(ReaderContext);

  const isMainUser = !readerCtx.currentReaderId;

  const [style, setStyle] = useState({ display: "none" });
  const [isLocked, setIsLocked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const listContainerStyle = {
    height: "150px",
    listStyle: "none",
    padding: "5px",
  };
  isMainUser && !isLocked
    ? (listContainerStyle.cursor = "pointer")
    : (listContainerStyle.cursor = "default");

  const handleUpdatePrizeHandler = () => {
    //TODO: change route
    history.push(`/`);
  };

  useEffect(() => {
    if (props.earnedCoins) {
      setIsLocked(props.earnedCoins < props.readingRequirement);
    }
  }, [props.earnedCoins, props.readingRequirement]);

  return (
    <li
      style={listContainerStyle}
      onMouseEnter={(e) => {
        setStyle({ display: "flex", justifyContent: "space-between" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
    >
      {isLocked && (
        <LockedStyle>
          <LockIcon fontSize="large" />
        </LockedStyle>
      )}
      <ul style={{ position: "absolute", zIndex: 1 }}>
        <li>{props.prizeName}</li>
        <li>{props.readingRequirement}</li>
        {isMainUser && (
          <li style={style}>
            <Button>
              <DeleteIcon />
            </Button>{" "}
            <Button>
              <EditIcon onClick={handleUpdatePrizeHandler} />
            </Button>
          </li>
        )}
        {!isMainUser && !isLocked && (
          <li>
            <Tooltip title="Select Prize">
              <Button>
                <AddCircleIcon />
              </Button>
            </Tooltip>
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
  height: 150px;
  width: 200px;
  background-color: rgba(136, 136, 136, 0.2);
  border-radius: 5px;
`;

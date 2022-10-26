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
    <li style={listContainerStyle}>
      {isLocked && (
        <LockedStyle>
          <li>
            <LockIcon fontSize="large" />
          </li>
        </LockedStyle>
      )}
      {!isLocked && !isMainUser && (
        <UnlockedStyle>
          <li>
            <Tooltip title="Select Prize">
              <Button>
                <AddCircleIcon fontSize="large" />
              </Button>
            </Tooltip>
          </li>
        </UnlockedStyle>
      )}
      {isMainUser && (
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

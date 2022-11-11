import { useContext } from "react";
import { Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";

import ReaderContext from "../../store/reader-contex";

const ReaderBadge = (props) => {
  const readerCtx = useContext(ReaderContext);

  const initials = [...props.readerName].slice(0, 2).join("");
  const capitalizedInitials =
    initials.charAt(0).toUpperCase() + initials.slice(1);

  return (
    <ReaderBadgeContents>
      {readerCtx.currentReaderName === "" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography align="center" variant="h4">
            {props.readerName}
          </Typography>
          <InfoIcon color="action" />
        </div>
      ) : (
        <>
          {" "}
          <Typography align="center">{props.minutesRead} Minutes</Typography>
          <Typography align="center" variant="h2">
            {capitalizedInitials}
          </Typography>
          <Typography align="center">{props.coinsEarned} Coins</Typography>
        </>
      )}
    </ReaderBadgeContents>
  );
};

export default ReaderBadge;

const ReaderBadgeContents = styled.li`
  display: grid;
  align-items: center;
  width: 150px;
  height: 150px;
  // border: 1px solid #888;
  border-radius: 50%;
  padding: 2rem;
  box-shadow: 3px 3px 10px #666;
`;

import { Typography } from "@mui/material";
import styled from "styled-components";

const ReaderBadge = (props) => {
  return (
    <ReaderBadgeContents>
      <Typography align="center" sx={{ color: "#555" }}>
        {props.minutesRead} Minutes
      </Typography>
      <Typography align="center" variant="h4">
        {props.readerName}
      </Typography>
      <Typography align="center" sx={{ color: "#555" }}>
        {props.coinsEarned} Coins
      </Typography>
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

import { useEffect, useContext } from "react";

import ReaderContext from "../../store/reader-contex";
import ReaderWeeklyAchievement from "../../components/Reader/ReaderWeeklyAchievements";

import styled from "styled-components";

import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ReaderSummary = (props) => {
  const readerCtx = useContext(ReaderContext);

  //initially set to mainUser before routing off to reader
  useEffect(() => {
    if (
      readerCtx.currentReaderId !== "" &&
      readerCtx.currentReaderName !== ""
    ) {
      readerCtx.onChangeReader("", "", "");
    }
  }, [readerCtx.currentReaderId, readerCtx.currentReaderName]);

  return (
    <ReaderSummaryContainer>
      <ReaderSummaryInfo>
        <div>
          <Typography
            variant="h2"
            onClick={props.updateUser}
            sx={{
              display: "flex",
              cursor: "pointer",
              color: "gray",
              marginTop: "2rem",
            }}
          >
            {props.reader["reader_name"]}
            <EditIcon
              sx={{
                alignSelf: "start",
                padding: "2px",
                border: "1px solid rgba(153, 153, 153, .5)",
                borderRadius: "50%",
              }}
            />
          </Typography>
          <ReaderWeeklyAchievement />
        </div>
      </ReaderSummaryInfo>
      <ReaderActionButtons>
        <Button onClick={props.displayHistory} variant="outlined">
          Reading History
        </Button>
        <Button onClick={props.displayPrizes} variant="outlined">
          Earned Prizes
        </Button>
        <Button
          onClick={props.startReading}
          variant="outlined"
          sx={{
            fontSize: "24px",
            alignSelf: "center",
            gridRow: "2/3",
          }}
        >
          START Reading
        </Button>
      </ReaderActionButtons>
    </ReaderSummaryContainer>
  );
};
export default ReaderSummary;

const ReaderSummaryContainer = styled.div`
  display: grid;
  grid-gap: 3rem;
  justify-content: center;
  @media (min-width: 500px) {
    grid-template-columns: auto auto;
  }
`;

const ReaderSummaryInfo = styled.div`
  margin-top: 2rem;
  align-self: end;
`;

const ReaderActionButtons = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media (min-width: 500px) {
    margin-top: 6rem;
  }
`;

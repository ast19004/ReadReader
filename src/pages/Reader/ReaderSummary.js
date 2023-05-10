import { useEffect, useContext, useState } from "react";

import ReaderContext from "../../store/reader-contex";

import styled from "styled-components";

import ReaderBadge from "../../components/Reader/ReaderBadge";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ReaderSummary = (props) => {
  const readerCtx = useContext(ReaderContext);

  const [dataDisplay, setDataDisplay] = useState(true);
  const [toggleValue, setToggleValue] = useState("prizes");

  const toggleDisplay = () => {
    setDataDisplay((prevState) => !prevState);
  };

  //Handle data display based on boolean toggled by Toggle component
  useEffect(() => {
    if (dataDisplay) {
      props.displayPrizes();
      setToggleValue("prizes");
    } else {
      props.displayHistory();
      setToggleValue("history");
    }
  }, [dataDisplay]);

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
      <ReaderSummaryInfo onClick={props.updateUser}>
        <div>
          <ReaderBadge
            readerName={props.reader["reader_name"]}
            // minutesRead={props.reader["total_reading_duration"]}
            // coinsEarned={props.reader["reading_coins"]}
            themeColor={props.reader["theme_color"]}
            onEdit={props.updateUser}
          />
        </div>
      </ReaderSummaryInfo>
      <ReaderActionButtons>
        <ToggleButtonGroup
          value={toggleValue}
          exclusive
          onChange={toggleDisplay}
          aria-label="Platform"
        >
          <ToggleButton value="prizes">Prizes</ToggleButton>
          <ToggleButton value="history">History</ToggleButton>
        </ToggleButtonGroup>
      </ReaderActionButtons>
    </ReaderSummaryContainer>
  );
};
export default ReaderSummary;

const ReaderSummaryContainer = styled.div`
  display: grid;
  justify-content: center;
`;

const ReaderSummaryInfo = styled.div`
  margin: 2rem 0;
`;

const ReaderActionButtons = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: center;
`;

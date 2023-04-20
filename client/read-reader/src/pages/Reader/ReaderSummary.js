import { useEffect, useContext, useState } from "react";

import ReaderContext from "../../store/reader-contex";

import styled from "styled-components";

import ReaderBadge from "../../components/Reader/ReaderBadge";
import DataSwitch from "../../components/Reader/DataSwitch";

const ReaderSummary = (props) => {
  const readerCtx = useContext(ReaderContext);

  const [dataDisplay, setDataDisplay] = useState(true);

  const toggleDisplay = () => {
    setDataDisplay((prevState) => !prevState);
  };

  //Handle data display based on boolean toggled by Switch component
  useEffect(() => {
    if (dataDisplay) {
      props.displayHistory();
    } else {
      props.displayPrizes();
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
        <DataSwitch onClick={toggleDisplay} />
        {/* <button onClick={props.displayHistory}>History</button>
        <button onClick={props.displayPrizes}>Prizes</button> */}
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
  margin-top: 2rem;
`;

const ReaderActionButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

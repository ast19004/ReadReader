
import { Typography } from "@mui/material";

import AvailablePrizes from "../../pages/Prize/AvailablePrizes";

const ReaderPrizeSelection = (props) => {
    return (
        <AvailablePrizes readerId ={props.readerId}>
            <Typography align="center" variant="h5" component="p">Total Coins: </Typography>
        </AvailablePrizes>
    );
};

export default ReaderPrizeSelection;
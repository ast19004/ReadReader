

import AvailablePrizes from "../../pages/Prize/AvailablePrizes";

const ReaderPrizeSelection = (props) => {
    return (
        <AvailablePrizes readerId ={props.readerId}/>
    );
};

export default ReaderPrizeSelection;
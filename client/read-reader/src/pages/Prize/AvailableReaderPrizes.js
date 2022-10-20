import { useEffect, useState, useContext} from "react";

import AuthContext from "../../store/auth-contex";

import styled from 'styled-components';
import Prize from "../../components/Prize/Prize";

const AvailableReaderPrizes = () => {
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState();

    const [prizes, setPrizes] = useState(); 
    return (
        <></>
    );
};

export default AvailableReaderPrizes;
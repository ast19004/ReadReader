import { useEffect, useState, useContext } from 'react';

import AuthContext from '../../store/auth-contex';

import { Typography } from "@mui/material";

import AvailablePrizes from "../../pages/Prize/AvailablePrizes";

const ReaderPrizeSelection = (props) => {
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState('');
    const [earnedCoins, setEarnedCoins] = useState(0);

    //get reader coins using readerId from props
    useEffect(()=>{
        const url = "http://localhost:5000/reader/" + props.readerId;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        const fetchReader = async () => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();

            const loadedReader = resData.reader;

            setEarnedCoins(loadedReader.reading_coins);

        };
        fetchReader().catch(err=> setError(err.msg));
    }, [authCtx.token]);

    return (
        <AvailablePrizes readerId ={props.readerId}>
            <Typography align="center" variant="h5" component="p">Total Coins: <span style={{border: '1px solid rgba(85, 85, 85, .3)', borderRadius: '50%', padding: '5px'}}>{earnedCoins}</span></Typography>
        </AvailablePrizes>
    );
};

export default ReaderPrizeSelection;
import { useEffect, useState, useContext} from "react";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import styled from 'styled-components';
import Prize from "../../components/Prize/Prize";

import { Typography } from '@mui/material'; 

const AvailablePrizes = (props) => {
    const authCtx = useContext(AuthContext);
    const readerCtx = useContext(ReaderContext);

    const isMainUser = !readerCtx.currentReaderId;

    const [error, setError] = useState();

    const [prizes, setPrizes] = useState(); 

    useEffect(() => {
        const url =  isMainUser ? `http://localhost:5000/prizes/` : `http://localhost:5000/reader/${props.readerId}/prizes/available`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        const fetchPrizesData = async() => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();
            const loadedPrizes = resData.prizes;
            setPrizes(loadedPrizes);
        };

        fetchPrizesData().catch(err => setError(err.message))
    }, [authCtx.token]);

    return (
        <>
        <Typography align="center" variant="h2" sx={{color: "gray", marginTop: '2rem'}}>Prizes</Typography>
        {props.children && props.children}
        <PrizesWrapper>
            {!prizes && <p>No prizes found.</p>}
            {prizes && prizes.map(prize => <Prize key={prize._id} prizeName={prize.prize_name} readingRequirement={prize.reading_requirement}/>)}
            {error && <p>{error}</p>}
        </PrizesWrapper>
        </>
    );

};


export default AvailablePrizes;


const PrizesWrapper = styled.div`
    display: grid;
    grid-gap: 4rem ;
    padding: 4rem;
    justify-content: center;

    @media(min-width: 420px){
        grid-template-columns: repeat(2, 200px)
    }
    @media(min-width: 750px){
        grid-template-columns: repeat(3, 200px);
    }
`;
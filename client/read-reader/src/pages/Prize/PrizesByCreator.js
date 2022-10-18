import { useEffect, useState, useContext} from "react";

import AuthContext from "../../store/auth-contex";

import styled from 'styled-components';
import Prize from "./Prize";

const PrizesByCreator = () => {
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState();

    const [prizes, setPrizes] = useState(); 

    useEffect(() => {
        const url = `http://localhost:5000/prizes/`;
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
            console.log(JSON.stringify(loadedPrizes));
            setPrizes(loadedPrizes);
        };

        fetchPrizesData().catch(err => setError(err.message))
    }, [authCtx.token]);

    return (
        <PrizesWrapper>
            {!prizes && <p>No prizes found.</p>}
            {prizes && prizes.map(prize => <Prize prizeName={prize.prize_name} readingRequirement={prize.reading_requirement}/>)}
            {error && <p>{error}</p>}
        </PrizesWrapper>
    );

};


export default PrizesByCreator;


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
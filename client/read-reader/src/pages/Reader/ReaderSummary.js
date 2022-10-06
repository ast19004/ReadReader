import ReaderBadge from "../../components/Reader/ReaderBadge";
import ReaderWeeklyAchievement from "../../components/Reader/ReaderWeeklyAchievements";

import styled from 'styled-components';

import { Button } from "@mui/material";

import { useEffect, useContext, useState } from "react";

import AuthContext from '../../store/auth-contex';

import { Switch, useParams} from 'react-router-dom';

import ProtectedRoute from "../../components/Auth/ProtectedRoute";
import UpdateReader from "./UpdateReader";
import UpdatePrizes from "../Prize/UpdatePrizes";
import RedeemPrizes from "../Prize/RedeemPrizes";

const ReaderSummary = () => {
    const params = useParams();
    const readerId = params.id;

    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');

    const [reader, setReader] = useState();

    useEffect(()=>{
        const url = "http://localhost:5000/reader/" + readerId;
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

            setReader(loadedReader);

        };
        fetchReader().catch(err=> setError(err.msg));
    }, [readerId]);

    return (
        <>  
        { !error && reader && 
            <>
            <ReaderSummaryContent>
                <ReaderBadge minutesRead={reader["total_reading_duration"]} coinsEarned={reader["reading_coins"]} readerName={reader['reader_name']}/>
                <ReaderWeeklyAchievement style={{alignSelf : 'center'}}/>
            </ReaderSummaryContent>
            <EditReaderActionButtons>
                <Button variant="outlined">Session Log</Button>
                <Button variant="outlined">Update Reader</Button>
                 {/* Include Redeem Prizes in Prizes */}
                <Button variant="outlined">Prizes</Button>
            </EditReaderActionButtons>
            <Switch>
                <ProtectedRoute path={'/updateReader'} redirectPath={'/'}>
                    <UpdateReader/>
                </ProtectedRoute>
                <ProtectedRoute path={'/updatePrizes'} redirectPath={'/'}>
                    <UpdatePrizes/>
                </ProtectedRoute>
                <ProtectedRoute path={'/redeemPrizes'} redirectPath={'/'}>
                    <RedeemPrizes/>
                </ProtectedRoute>
            </Switch>
            </>
        }
         {error && <p>{error}</p>}
        </>
    );
};

export default ReaderSummary;


const ReaderSummaryContent = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 2rem;
    justify-content: center;
    margin-top: 2rem;

    @media(min-width: 500px){
        grid-template-columns: auto auto;
    }
`;

const EditReaderActionButtons = styled.div`
    display: grid;
    grid-gap: 2rem;
    margin: 0 auto;
    margin-top: 2rem;
    max-width: 80%;
    @media(min-width: 500px){
        grid-template-columns: auto auto auto;
        margin-top: 6rem;
    }
`;
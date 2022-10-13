import { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import ReaderBadge from "../../components/Reader/ReaderBadge";
import ReaderWeeklyAchievement from "../../components/Reader/ReaderWeeklyAchievements";

import styled from 'styled-components';

import { Button, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CloseIcon from '@mui/icons-material/Close';

import AuthContext from '../../store/auth-contex';

import { useParams} from 'react-router-dom';

const ReaderSummary = () => {
    const history = useHistory();

    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');

    const [reader, setReader] = useState();
    const [isReading, setIsReading] = useState(false);
    const [isRecordingReading, setIsRecordingReading] = useState(false);

    const [readingStart, setReadingStart] = useState(new Date());

    const params = useParams();
    const readerId = params.id;
    //Get reader by readerId using id from url params
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
    }, [readerId, authCtx.token]);


    const fetchAddReaderSession = useCallback(async(minutesRead)=> {
        const url = "http://localhost:5000/reader/session"; 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            },
            body: JSON.stringify({
                reader_id: readerId,
                reading_duration: minutesRead
            })
        };
        const res = await fetch(url, requestOptions);

        if(!res.ok){
            throw new Error('Something went wrong!');
        };
        const resData = await res.json();

        }, []);

    const handleUpdateUser = () => {
        history.push(`/reader/${readerId}/edit`);
    };

    const handleLogReading = () => {
        setIsReading(true);
    };

    const handleLogReadingCancel = () => {
        setIsReading(false);
        history.push(`/reader/${readerId}`);
    };

    const handleReadingStatus = async () => {

        if(!isRecordingReading){
            setIsRecordingReading(true);
            setReadingStart(Date.now());
        }else{
            setIsRecordingReading(false);
            //If reading recording finished, get total time and save session.
            const durationReadMillis = Date.now() - readingStart;
            const durationReadMinutes = Math.round((durationReadMillis/ 1000)/ 60);

            //If reading less than a minute, assume accidental session.
            if(durationReadMinutes < 1){
                return;
            }
            fetchAddReaderSession(durationReadMinutes).catch(error => setError(error));
        }
           
    };

    return (
        <>  
        { !error && reader && 
            <div>
            <ReaderSummaryContainer>
                {/* <ReaderBadge minutesRead={reader["total_reading_duration"]} coinsEarned={reader["reading_coins"]} readerName={reader['reader_name']}/> */}
                <div>
                    <Typography variant="h2" sx={{color: "gray", marginTop: '2rem'}}>{reader['reader_name']}</Typography>
                    <ReaderWeeklyAchievement/>
                </div>
                 {!isReading && <Button onClick={handleLogReading} variant="outlined" sx={{fontSize:"24px", alignSelf: "center"}}>LOG Reading</Button>}
            </ReaderSummaryContainer>
            {!isReading && <EditReaderActionButtons>
                <Button variant="outlined">Log History</Button>
                 {/* Include Redeem Prizes in Prizes */}
                <Button variant="outlined">Prizes</Button>
                <Button variant="outlined" onClick={handleUpdateUser}>Update Reader</Button>
            </EditReaderActionButtons>}
            {isReading && <LogReadingActionButtons>
                {!isRecordingReading && <Button onClick={handleLogReadingCancel} variant="outlined"><CloseIcon/></Button>}<Button onClick={handleReadingStatus} variant="outlined" sx={{gridColumn: '2/-1'}}>{!isRecordingReading ? <PlayArrowIcon/> : <StopCircleIcon/>}</Button>
            </LogReadingActionButtons>}
            {error && <p>{error}</p>}
            </div>
        }
        </>
    );
};

export default ReaderSummary;


const ReaderSummaryContainer = styled.div`
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

const LogReadingActionButtons = styled(EditReaderActionButtons)`
@media(min-width: 500px){
    grid-template-columns: 1fr 2fr;
    justify-content: center;
    margin-top: 6rem;
    max-width: 300px;
}
`;
import { useEffect, useContext, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";

import ReaderWeeklyAchievement from "../../components/Reader/ReaderWeeklyAchievements";
import SessionsHistory from "./Sessions/SessionsHistory";
import EditUserModal from "../../components/UI/EditUserModal";
import ReaderLogSession from "../../components/Reader/ReaderLogSession";

import styled from 'styled-components';

import { Button,Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import AuthContext from '../../store/auth-contex';
import ReaderContext from "../../store/reader-contex";

import { useParams} from 'react-router-dom';

const Reader = () => {
    const history = useHistory();

    const authCtx = useContext(AuthContext);
    const readerCtx = useContext(ReaderContext);

    const [error, setError] = useState('');

    const [reader, setReader] = useState();

    const [editIsOpen, setEditIsOpen] = useState(false);


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



    const onChangeReader = (id, name) => {
        readerCtx.onChangeReaderId(id);
        readerCtx.onChangeReaderName(name);
    };

    const handleUpdateUser = () => {
        history.push(`/reader/${readerId}/edit`);
        setEditIsOpen(true);
    };

    const handleLogReading = () => {
        onChangeReader(reader._id, reader.reader_name);
        history.push(`/reader/${readerId}/logReading/`);
    };

    const handleDisplayLogHistory = () => {
        history.push(`/reader/${readerId}/sessions`);
    };



    return (
        <>  
        { !error && reader && 
            <div>
            <Switch>
                <Route path={'/reader/:id/logReading/'} exact>
                    <ReaderLogSession minutesRead={reader["total_reading_duration"]} coinsEarned={reader["reading_coins"]} readerName={reader['reader_name']}/>
                </Route>
                
                <Route path={'*'}>
                    <ReaderSummaryContainer>
                        <div>
                            <Typography variant="h2" onClick={handleUpdateUser} sx={{display: 'flex', cursor: 'pointer', color: "gray", marginTop: '2rem'}}>{reader['reader_name']}
                            <EditIcon sx={{alignSelf: 'start', padding: '2px', border: '1px solid rgba(153, 153, 153, .5)', borderRadius: '50%'}}/>
                            </Typography>
                            <ReaderWeeklyAchievement/>
                        </div>
                        <Button onClick={handleLogReading} variant="outlined" sx={{fontSize:"24px", alignSelf: "center"}}>LOG Reading</Button>
                    </ReaderSummaryContainer>

                    <Route path={`/reader/:id/edit`} exact>
                        <EditUserModal open={editIsOpen} onClose={() => setEditIsOpen(false)}/>
                    </Route>

                    <ReaderInfoButtons>
                        <Button onClick={handleDisplayLogHistory} variant="outlined">Log History</Button>
                        {/* Include Redeem Prizes in Prizes */}
                        <Button variant="outlined">Earned Prizes</Button>
                    </ReaderInfoButtons>

                    <Route path={`/reader/:id/sessions/`} exact>
                        <SessionsHistory token={authCtx.token} readerId={readerId}/>
                    </Route>
                </Route>
            </Switch>

            {error && <p>{error}</p>}
        
            </div>
        }
        </>
    );
};

export default Reader;


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

const ReaderInfoButtons = styled.div`
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
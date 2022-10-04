import ReaderBadge from "../../components/Reader/ReaderBadge";
import ReaderWeeklyAchievement from "../../components/Reader/ReaderWeeklyAchievements";

import styled from 'styled-components';

import { Button } from "@mui/material";

import { Switch, } from 'react-router-dom';

import ProtectedRoute from "../../components/Auth/ProtectedRoute";
import UpdateReader from "./UpdateReader";
import UpdatePrizes from "../Prize/UpdatePrizes";
import RedeemPrizes from "../Prize/RedeemPrizes";

const ReaderSummary = () => {
    return (
        <>
            <ReaderSummaryContent>
                <ReaderBadge minutesRead={120} coinsEarned={70} initials={"RS"}/>
                <ReaderWeeklyAchievement style={{alignSelf : 'center'}}/>
            </ReaderSummaryContent>
            <EditReaderActionButtons>
                <Button variant="outlined">Update Reader</Button>
                <Button variant="outlined">Update Prizes</Button>
                <Button variant="outlined">Redeem Prizes</Button>
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
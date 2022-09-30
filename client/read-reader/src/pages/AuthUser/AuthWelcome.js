import ReaderBadge from "../../components/Reader/ReaderBadge";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
};

const AuthWelcome = () => {
    // TODO: readerId will be replaced by actual id of each Item
    return (
        <Link to={'/reader/'} style={linkStyle}>
            <ReaderBadgesContainer>
                <ReaderBadge minutesRead={120} coinsEarned={70} initials={"RS"}/>
                <ReaderBadge minutesRead={12} coinsEarned={12} initials={"AS"}/>
                <ReaderBadge minutesRead={60} coinsEarned={10} initials={"LB"}/>
            </ReaderBadgesContainer>
        </Link>
    );
};

export default AuthWelcome;

const ReaderBadgesContainer = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 5rem;
    justify-content: center;
    align-content: center;
    margin-top: 5rem;

    @media(min-width: 500px){
        grid-template-columns: auto auto;
    }

`;
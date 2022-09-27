import { Link } from 'react-router-dom';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import styled from 'styled-components';


const Header = () => {
/* User Selector Btn also includes Logot btn
    if logged in show logout and user selection btn*/
    return (
        <Wrapper>
            <nav>
                <IconsWrapper>
                    <HomeIconLink to='/'>
                        <AutoStoriesIcon fontSize="medium"/>
                    </HomeIconLink>
                    <UserIconsWrapper>
                        <IconLink to='/'>
                            <SettingsIcon fontSize="medium"/>
                        </IconLink>
                        <IconLink to='/'>
                            <PersonIcon fontSize='medium'/>
                        </IconLink>
                    </UserIconsWrapper>
                </IconsWrapper>
            </nav>
        </Wrapper>
    );
    
};

export default Header;

const Wrapper = styled.header`
    background-color : 	#888;
`;

const MainNav = styled.nav`
`;

const IconsWrapper = styled.ul`
    display: grid;
    margin: 0;
    padding: 1rem;
    grid-template-columns: 36px auto;
`;

const UserIconsWrapper = styled.li`
    display: flex;
    margin-left: auto;
`;


const IconLink = styled(Link)`
    display: block;
    background: white;
    border-radius: 50%;
    padding: 4px;
    margin: 0.5rem;
    `;

const HomeIconLink = styled(IconLink)`
    margin: auto;
`;



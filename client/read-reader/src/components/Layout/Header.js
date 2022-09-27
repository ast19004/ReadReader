import classes from './Header.module.css';

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
                    <HomeIconWrapper>
                        <AutoStoriesIcon fontSize="medium"/>
                    </HomeIconWrapper>
                    <UserIconsWrapper>
                        <Icon>
                            <SettingsIcon fontSize="medium"/>
                        </Icon>
                        <Icon>
                            <PersonIcon fontSize='medium'/>
                        </Icon>
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

const HomeIconWrapper = styled.li`
    display: block;
    background: white;
    border-radius: 50%;
    padding: 4px;
`;

const Icon = styled.div`
    display: block;
    background: white;
    border-radius: 50%;
    padding: 4px;
    margin: 0 0.5rem;
    `;



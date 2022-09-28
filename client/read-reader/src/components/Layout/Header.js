import { useContext, useState  } from 'react';

import AuthContext from '../../store/auth-contex';

import { Link } from 'react-router-dom';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';

import styled from 'styled-components';
import UserMenu from './UserMenu';


const Header = () => {
/* User Selector Btn also includes Logot btn
    if logged in show logout and user selection btn*/
    const authCtx = useContext(AuthContext);

    const [showUserMenu, setShowUserMenu] = useState(false);

    const openUserMenu = () => {
        setShowUserMenu(true);
    }

    const closeUserMenu = () => {
        setShowUserMenu(false);
    }


    return (
        <Wrapper>
            <nav>
                <IconsWrapper>
                    <HomeIconLink to='/'>
                        <AutoStoriesIcon fontSize="medium"/>
                    </HomeIconLink>
                    {authCtx.isLoggedIn &&
                    <UserIconsWrapper>
                            <IconLink to='/settings'>
                                <SettingsIcon fontSize="medium"/>
                            </IconLink>
                            <UserMenu
                                id="user-menu"
                                open={openUserMenu}
                                onClose={closeUserMenu}
                                onClick={closeUserMenu}
                            >
                            </UserMenu>
                    </UserIconsWrapper>
                    }
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


const IconLink = styled(Link)`
    display: block;
    background: white;
    border-radius: 50%;
    padding: 3px 4px;
    margin: 0.5rem;
    `;
    // border: 1px solid #333;
    // box-shadow: 3px 2px 6px 2px #444;

const HomeIconLink = styled(IconLink)`
    margin: auto;
`;



import { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import ReaderContext from '../../store/reader-contex';

import HomeIcon from '@mui/icons-material/Home';

import styled from 'styled-components';
import AccountMenu from './AccountMenu';


const Header = () => {
    const readerCtx = useContext(ReaderContext);
    const [homeLinkPath, setHomeLinkPath] = useState('/'); 
    const [showAccountsMenu, setShowAccountsMenu] = useState(false);

    const openAccountsMenu = () => {
        setShowAccountsMenu(true);
    }

    const closeAccountsMenu = () => {
        setShowAccountsMenu(false);
    }

    useEffect(() => {
        if(readerCtx.currentReaderId === ''){
            setHomeLinkPath('/');
        }else{
            setHomeLinkPath(`/reader/${readerCtx.currentReaderId}/logReading`);
        }
    }, [readerCtx.currentReaderId, readerCtx.currentReaderName]);


    return (
        <Wrapper>
            <nav>
                <IconsWrapper>            
                    <HomeIconWrapper>
                        <Link to={homeLinkPath}>
                            <HomeIcon fontSize="medium"/>
                        </Link>
                    </HomeIconWrapper>
                    <AccountIconsWrapper>
                            <AccountMenu
                                id="accounts-menu"
                                open={openAccountsMenu}
                                onClose={closeAccountsMenu}
                                onClick={closeAccountsMenu}
                            />
                    </AccountIconsWrapper>
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

const AccountIconsWrapper = styled.li`
    display: flex;
    margin-left: auto;
`;


const HomeIconWrapper = styled.li`
    display: block;
    background: white;
    border-radius: 50%;
    padding: 3px 4px;
    margin: auto;
    color: #888
    `;



import classes from './Header.module.css';

import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import Link from '@mui/material/Link';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const Header = () => {
/* User Selector Btn also includes Logot btn
    if logged in show logout and user selection btn*/
    return (
        <header>
            <nav>
                <ul>
                    <AutoStoriesIcon/>
                    <PersonIcon/>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
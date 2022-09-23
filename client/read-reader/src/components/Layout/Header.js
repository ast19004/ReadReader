import classes from './Header.module.css';

import Button from '@mui/material/Button'


const Header = () => {
/* User Selector Btn also includes Logot btn
    if logged in show logout and user selection btn*/
    return (
        <header>
            <nav>
                <ul>
                    <li>LOGO</li>
                    <Button>UserSelector</Button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
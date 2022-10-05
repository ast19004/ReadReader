import React, { useState, useContext, useRef } from 'react';

import AuthContext from '../../store/auth-contex';

import { Link } from 'react-router-dom';

import { Menu, MenuItem, IconButton, Avatar, Divider, ListItemIcon } from '@mui/material';
import {Person, PersonAdd, Logout} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

import styled from 'styled-components';

const UserMenu = () => {
    const userMenu = useRef();
    const authCtx = useContext(AuthContext);

    const [anchorElement, setAnchorElement] = useState(null);

    const userMenuOpen = Boolean(anchorElement);

    const handleMenuClick = (event) => {
        setAnchorElement(event.target);
    };
    const handleMenuClose = () => {
        setAnchorElement(null);
        
        
    };

    return (
        <div>
        <IconButton
            style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "4px",
                margin: "0.5rem"
            }}
            onClick={handleMenuClick}
            size="medium"
            aria-controls={userMenuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={userMenuOpen ? 'true' : undefined}
            >
            <Person fontSize='medium'/>
        </IconButton>
        <MenuWrapper>
            <Menu
                anchorEl={anchorElement}
                id="user-menu"
                open={ userMenuOpen }
                onClose={handleMenuClose}
                onClick={handleMenuClick}
                ref= { userMenu }
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem><Avatar/>USER</MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Avatar>Ru</Avatar>
                    </ListItemIcon>
                        Reader1
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Avatar>An</Avatar>
                    </ListItemIcon>
                        Reader2
                </MenuItem>
                <MenuItem>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                    Add another account
                </MenuItem>
                <Divider />
                <MenuItem onClick={authCtx.onLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </MenuWrapper>
    </div>
    );
};

export default UserMenu;

const MenuWrapper = styled.div`
`;
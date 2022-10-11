import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom"

import AuthContext from '../../store/auth-contex';

import { Menu, MenuItem, IconButton, Avatar, Divider, ListItemIcon } from '@mui/material';
import {Person, PersonAdd} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

import styled from 'styled-components';

const AccountMenu = () => {
    const authCtx = useContext(AuthContext);

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const [readers, setReaders] = useState();

    // if "" user == mainUser
    const[currentReader, setCurrentReader] = useState("");

    const userMenuOpen = !!anchorEl;

    const handleMenuClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddReader = () => {
        history.push('/reader');
    };

    const handleAddPrize = () => {
        history.push('/prize');
    };

    const handleSelectMainUser = () => {
        setCurrentReader("")
        history.push('/');
    }

    useEffect(()=> {
        const url = "http://localhost:5000/readers";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        
        const fetchReaderData = async() => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();
            
            const loadedReaders = resData.readers.map(reader => {
                const initials = [...reader['reader_name']].splice(0, 2).join("");
                return {
                    id: reader['_id'],
                    name: reader['reader_name'],
                    initials: initials.charAt(0).toUpperCase() + initials.slice(1),
            }
        });
            setReaders(loadedReaders);
            };

            fetchReaderData().catch((err) => {
                console.log(err);
            });
    }, []);

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
            { !currentReader && 
                <Person fontSize='medium'/>
            }
            { currentReader && 
                <Avatar sx={{ width: 23, height: 23, color: 'black', bgcolor: "white", padding: '1px'}}>{currentReader}</Avatar>
            }
        </IconButton>
        <MenuWrapper>
            <Menu
                anchorEl={anchorEl}
                id="user-menu"
                open={ userMenuOpen }
                onClose={handleMenuClose}
                onClick={handleMenuClose}
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
                <MenuItem onClick={handleSelectMainUser}><Avatar/>USER</MenuItem>
                <Divider />
                { readers && readers.map((reader)=>  
                     <MenuItem key={reader.id} onClick={ () => {setCurrentReader(reader.initials); history.push(`/reader/${reader.id}`);}}>
                        <ListItemIcon>
                            <Avatar>{reader.initials}</Avatar>
                        </ListItemIcon>
                            {reader.name}
                    </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleAddReader}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                    Add reader
                </MenuItem>

                <MenuItem onClick={handleAddPrize}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                    Add prize
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

export default AccountMenu;

const MenuWrapper = styled.div`
`;
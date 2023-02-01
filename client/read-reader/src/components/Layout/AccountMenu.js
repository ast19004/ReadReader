import domainPath from "../../domainPath";

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Person, PersonAdd } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import PrizesIcon from "@mui/icons-material/EmojiEvents";
import AddPrizeIcon from "../Prize/AddPrizeIcon";

import styled from "styled-components";

const AccountMenu = () => {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [readers, setReaders] = useState();

  // if "" user == mainUser
  const [currentReader, setCurrentReader] = useState("");
  const isMainUser = readerCtx.currentReaderName === "";

  const userMenuOpen = !!anchorEl;

  const handleMenuClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const returnToMainUser = () => {
    readerCtx.onChangeReaderName("");
    readerCtx.onChangeReaderId("");
  };

  const handleAddReader = () => {
    returnToMainUser();
    history.push("/reader");
  };

  const handleAddPrize = () => {
    returnToMainUser();
    history.push("/prize");
  };

  const handleViewPrizes = () => {
    returnToMainUser();
    history.push("/prizes/");
  };

  const handleSelectMainUser = () => {
    returnToMainUser();
    history.push("/");
  };

  const showIfMainUser = (component) => {
    if (!isMainUser) {
      return;
    }
    return component;
  };

  const handleLogout = () => {
    authCtx.onLogout();
    history.push("/");
  };

  useEffect(() => {
    const url = `${domainPath}/readers`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };

    const fetchReaderData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      const loadedReaders = resData.readers.map((reader) => {
        const initials = [...reader["reader_name"]].splice(0, 2).join("");
        return {
          id: reader["_id"],
          name: reader["reader_name"],
          initials: initials.charAt(0).toUpperCase() + initials.slice(1),
        };
      });
      setReaders(loadedReaders);
    };

    fetchReaderData().catch((err) => {
      console.log(err);
    });
  }, [authCtx.token, readerCtx.isUpdated]);

  useEffect(() => {
    if (!isMainUser) {
      const initials = [...readerCtx.currentReaderName].splice(0, 2).join("");
      const capitalizedInitials =
        initials.charAt(0).toUpperCase() + initials.slice(1);
      setCurrentReader(capitalizedInitials);
    } else {
      setCurrentReader("");
    }
  }, [isMainUser, readerCtx.currentReaderName, readerCtx.isUpdated]);

  return (
    <div>
      <IconButton
        style={{
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "4px",
          margin: "0.5rem",
        }}
        onClick={handleMenuClick}
        size="medium"
        aria-controls={userMenuOpen ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={userMenuOpen ? "true" : undefined}
      >
        {!currentReader && (
          <Person
            fontSize="medium"
            sx={{
              color: "white",
              backgroundColor: "black",
              padding: "5px",
              borderRadius: "25px",
            }}
          />
        )}
        {currentReader && (
          <Avatar
            sx={{
              width: 23,
              height: 23,
              color: "white",
              backgroundColor: "black",
              padding: "5px",
              borderRadius: "25px",
            }}
          >
            {currentReader}
          </Avatar>
        )}
      </IconButton>
      <MenuWrapper>
        <Menu
          anchorEl={anchorEl}
          id="user-menu"
          open={userMenuOpen}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleSelectMainUser}>
            <Avatar />
            USER
          </MenuItem>
          {readers && <Divider />}
          {readers &&
            readers.map((reader) => (
              <MenuItem
                key={reader.id}
                onClick={() => {
                  readerCtx.onChangeReaderName(reader.name);
                  readerCtx.onChangeReaderId(reader.id);
                  history.push(`/reader/${reader.id}/logReading/`);
                }}
              >
                <ListItemIcon>
                  <Avatar>{reader.initials}</Avatar>
                </ListItemIcon>
                {reader.name}
              </MenuItem>
            ))}
          {showIfMainUser(
            <MenuItem onClick={handleAddReader}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add reader
            </MenuItem>
          )}
          {showIfMainUser(<Divider />)}
          {showIfMainUser(
            <MenuItem onClick={handleViewPrizes}>
              <ListItemIcon>
                <PrizesIcon fontSize="small" />
              </ListItemIcon>
              Prizes
            </MenuItem>
          )}
          {showIfMainUser(
            <MenuItem onClick={handleAddPrize}>
              <ListItemIcon>
                <AddPrizeIcon />
              </ListItemIcon>
              Add prize
            </MenuItem>
          )}
          {showIfMainUser(<Divider />)}
          {showIfMainUser(
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          )}
        </Menu>
      </MenuWrapper>
    </div>
  );
};

export default AccountMenu;

const MenuWrapper = styled.div``;

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
  const [currentReaderData, setCurrentReaderData] = useState();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isMainUser = readerCtx.currentReaderName === "";

  const handleMenuClick = (event) => {
    setAnchorEl(event.target);
    setUserMenuOpen((prev) => {
      return !prev;
    });
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setUserMenuOpen(false);
  };
  const returnToMainUser = () => {
    readerCtx.onChangeReader("", "", "");
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
          theme: reader["theme_color"],
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

      setCurrentReaderData(
        readers.find(
          (reader) =>
            reader.id.toString() === readerCtx.currentReaderId.toString()
        )
      );
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
              color: "#999",
              backgroundColor: "white",
              border: "1px solid #999",
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
              backgroundColor: `${currentReaderData.theme}`,
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
          className="accountMenu"
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
              right: 0,
              left: "unset !important",
              borderRadius: "25px 0 0 25px",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root ": {
                margin: "5px 25px",
              },
            },
          }}
          // transformOrigin={{ horizontal: "right", vertical: "top" }}
          // anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleSelectMainUser}>
            <Avatar />
            USER
          </MenuItem>
          {readers && <Divider sx={{ bgcolor: "#49C5B6" }} />}
          {readers &&
            readers.map((reader) => (
              <MenuItem
                key={reader.id}
                onClick={() => {
                  history.push(`/reader/${reader.id}/home/`);
                }}
              >
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: `${reader.theme}` }}>
                    {reader.initials}
                  </Avatar>
                </ListItemIcon>
                {reader.name}
              </MenuItem>
            ))}
          {showIfMainUser(
            <MenuItem onClick={handleAddReader}>
              <ListItemIcon>
                <PersonAdd fontSize="medium" />
              </ListItemIcon>
              Add reader
            </MenuItem>
          )}
          {showIfMainUser(<Divider sx={{ bgcolor: "#49C5B6" }} />)}
          {showIfMainUser(
            <MenuItem onClick={handleAddPrize}>
              <ListItemIcon sx={{ marginLeft: "-3px" }}>
                <AddPrizeIcon fontSize="medium" />
              </ListItemIcon>
              Add prize
            </MenuItem>
          )}
          {showIfMainUser(
            <MenuItem onClick={handleViewPrizes}>
              <ListItemIcon>
                <PrizesIcon fontSize="medium" />
              </ListItemIcon>
              View prizes
            </MenuItem>
          )}
          <Divider sx={{ bgcolor: "#49C5B6" }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </MenuWrapper>
    </div>
  );
};

export default AccountMenu;

const MenuWrapper = styled.div``;

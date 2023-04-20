import { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import ReaderContext from "../../store/reader-contex";

import HomeIcon from "@mui/icons-material/Home";
import ReadIcon from "@mui/icons-material/AutoStories";
import PrizesIcon from "@mui/icons-material/EmojiEvents";

import styled from "styled-components";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const readerCtx = useContext(ReaderContext);
  const [homeLinkPath, setHomeLinkPath] = useState("/");
  const [showAccountsMenu, setShowAccountsMenu] = useState(false);

  const isMainUser = !readerCtx.currentReaderId;
  const prizeLinkPath = `/reader/${readerCtx.currentReaderId}/prizes`;

  const openAccountsMenu = () => {
    setShowAccountsMenu(true);
  };

  const closeAccountsMenu = () => {
    setShowAccountsMenu(false);
  };

  useEffect(() => {
    if (readerCtx.currentReaderId === "") {
      setHomeLinkPath("/");
    } else {
      setHomeLinkPath(`/reader/${readerCtx.currentReaderId}/logReading`);
    }
  }, [readerCtx.currentReaderId, readerCtx.currentReaderName]);

  return (
    <header style={{ position: "fixed", top: "0px", width: "100%" }}>
      <nav
        style={
          isMainUser
            ? {}
            : {
                backgroundColor: readerCtx.currentTheme,
                height: "225px",
              }
        }
      >
        <IconsWrapper>
          <IconsLeftWrapper>
            <IconWrapper>
              <Link to={homeLinkPath}>
                <HomeIcon
                  fontSize="medium"
                  sx={{
                    color: `${isMainUser ? "#999" : "white"}`,
                    backgroundColor: `${isMainUser ? "white" : "transparent"}`,
                    border: `${
                      isMainUser ? "1px solid #999" : "4px solid white"
                    }`,
                    borderRadius: "50%",
                    padding: `${isMainUser ? "10px" : "4px"}`,
                  }}
                />
              </Link>
            </IconWrapper>
            {!isMainUser && (
              <IconWrapper>
                <Link to={prizeLinkPath}>
                  <ReadIcon
                    fontSize="medium"
                    sx={{
                      color: "white",
                      border: "4px solid white",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </Link>
              </IconWrapper>
            )}
          </IconsLeftWrapper>
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
    </header>
  );
};

export default Header;

const IconsLeftWrapper = styled.li`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
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

const IconWrapper = styled.span`
  display: block;
  border-radius: 50%;
  padding: 3px 4px;
  margin: auto;
`;

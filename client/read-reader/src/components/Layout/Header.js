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
    <Wrapper>
      <nav>
        <IconsWrapper>
          <IconsLeftWrapper>
            <IconWrapper>
              <Link to={homeLinkPath}>
                {isMainUser ? (
                  <HomeIcon fontSize="medium" />
                ) : (
                  <ReadIcon fontSize="medium" />
                )}
              </Link>
            </IconWrapper>
            {!isMainUser && (
              <IconWrapper>
                <Link to={prizeLinkPath}>
                  <PrizesIcon fontSize="medium" />
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
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  background-color: #888;
`;

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
  background: white;
  border-radius: 50%;
  padding: 3px 4px;
  margin: auto;
  color: #888;
`;

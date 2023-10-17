import { Link, Route } from "react-router-dom";

import { Box } from "@mui/system";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";

import stackedBooksImg from "../../assets/Auth/stackedBooks.svg";
import { Button } from "@mui/material";
import { useState } from "react";
import AuthInfoModal from "../../components/Auth/AuthInfoModal";

function Auth() {
  const [open, setOpen] = useState(true);

  const handleInfoModal = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "calc(50% - 140.78px)",
          top: "2%",
          left: "0%",
          "@media(min-width: 500px)": {
            left: "1.5%",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          sx={{
            justifySelf: "center",
            fontFamily: "Ultra",
            fontStyle: "normal",
            letterSpacing: "2px",
            color: "#49C5B6",
          }}
        >
          read reader
        </Box>
        <Button
          onClick={handleInfoModal}
          sx={{
            fontFamily: "Ultra",
            fontStyle: "normal",
            letterSpacing: "2px",
            color: "#49C5B6",
          }}
        >
          <InfoTwoToneIcon fontSize="large" />
        </Button>
      </Box>
      <AuthInfoModal open={open} onClose={() => setOpen(false)} />
      <img className="authImage" src={stackedBooksImg} alt="Stacked Books" />
      <Route path={"/signup"} exact>
        <AuthRegister />
      </Route>
      <Route path={"/"} exact>
        <AuthLogin />
        <Link
          to="/signup"
          variant="contained"
          style={{
            display: "block",
            marginTop: "1rem",
            textAlign: "center",
            color: "#5DB075",
            textDecoration: "none",
            padding: "5px",
          }}
        >
          <b>No Account? Sign Up</b>
        </Link>
      </Route>
    </Box>
  );
}

export default Auth;

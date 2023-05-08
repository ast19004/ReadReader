import { Link, Route } from "react-router-dom";
import { Box } from "@mui/system";

import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";

import stackedBooksImg from "../../assets/Auth/stackedBooks.svg";

function Auth() {
  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          width: "50vw",
          height: "25px",
          backgroundColor: "black",
          borderRadius: "0 0 25px 25px",
        }}
      />
      <img
        src={stackedBooksImg}
        alt="Stacked Books"
        style={{
          maxHeight: "80vh",
          margin: "25px auto",
        }}
      />
      <Route path={"/signup"} exact>
        <AuthRegister />
      </Route>
      <Route path={"/"}>
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
    </>
  );
}

export default Auth;

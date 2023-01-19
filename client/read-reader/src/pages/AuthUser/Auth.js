import { Link, Route, useHistory } from "react-router-dom";
import { Box } from "@mui/system";

import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";

import readerImg from "../../assets/Auth/reader.svg";
import CustomButton from "../../components/UI/CustomButton";

function Auth() {
  const history = useHistory();

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
      <Route path={"/signup"} exact>
        <AuthRegister />
      </Route>
      <Route path={"/login"} exact>
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
      <Route path={"/"} exact>
        <img
          src={readerImg}
          alt="Girl reading"
          style={{
            maxHeight: "80vh",
            margin: "4%",
          }}
        />
        <CustomButton
          sx={{
            margin: "0 4%",
            width: "92% !important",
            "@media(min-width: 550px)": { width: "350px !important" },
          }}
          onClick={() => history.push("/login")}
        >
          Login
        </CustomButton>
        <Link
          to="/signup"
          variant="contained"
          style={{
            display: "block",
            marginTop: "1rem",
            color: "#5DB075",
            textDecoration: "none",
            padding: "5px",
            margin: "5px 4%",
          }}
        >
          <b>No Account? Sign Up</b>
        </Link>
      </Route>
    </>
  );
}

export default Auth;

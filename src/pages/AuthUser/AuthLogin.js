import domainPath from "../../domainPath";
import { useState, useContext } from "react";

import AuthContext from "../../store/auth-contex";

import { TextField, Typography } from "@mui/material";

import CustomButton from "../../components/UI/CustomButton";

import styled from "styled-components";

function AuthLogin() {
  const authCtx = useContext(AuthContext);

  const [enteredEmail, setEnteredEmail] = useState("test@test.com");
  const [enteredPassword, setEnteredPassword] = useState("ABCDEFG");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const url = `${domainPath}/user/login/`;
    let token = null;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    };

    try {
      const res = await fetch(url, requestOptions);

      const resData = await res.json();

      if (res.status === 400) {
        throw new Error("Validation failed.");
      }
      if ((res.status !== 200) & (res.status !== 201)) {
        throw new Error("Could not authenticate you!");
      }
      token = resData.token;
    } catch (err) {
      setError(err.message);
    }

    authCtx.onLogin(token);

    resetForm();
  };

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        component={"h2"}
        sx={{
          color: "#49C5B6",
          marginTop: "2rem",

          fontFamily: "Ultra",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "36px",
        }}
      >
        Login
      </Typography>
      <LoginForm onSubmit={handleLogin}>
        <TextField
          onChange={emailChangeHandler}
          value={enteredEmail}
          style={{ width: "200px" }}
          type="email"
          label="Email"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={passwordChangeHandler}
          value={enteredPassword}
          style={{ width: "200px" }}
          type="password"
          label="Password"
          variant="outlined"
        />
        <br />
        <CustomButton type="submit">Login</CustomButton>
        {error && <p>{error}</p>}
      </LoginForm>
    </>
  );
}

export default AuthLogin;

const LoginForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 0.5rem;
`;

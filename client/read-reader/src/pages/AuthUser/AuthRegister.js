import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";

function RegisterUser() {
  const history = useHistory();
  const [error, setError] = useState("");

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");

  const resetForm = () => {
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredPasswordConfirm("");
  };
  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordConfirmChangeHandler = (event) => {
    setEnteredPasswordConfirm(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();

    const url = "http://localhost:5000/user/register";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredPasswordConfirm,
      }),
    };
    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      if (resData.errorMessage) {
        setError(resData.errorMessage);
      }
    } catch (err) {
      setError(err);
    }
    history.push("/");
    resetForm();
  };

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        component={"h2"}
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        New Account
      </Typography>
      <RegisterForm onSubmit={registerUser}>
        <TextField
          onChange={firstNameChangeHandler}
          value={enteredFirstName}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="First Name"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={lastNameChangeHandler}
          value={enteredLastName}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Last Name"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={emailChangeHandler}
          value={enteredEmail}
          style={{ width: "200px", margin: "5px" }}
          type="email"
          label="Email"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={passwordChangeHandler}
          value={enteredPassword}
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="Password"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={passwordConfirmChangeHandler}
          value={enteredPasswordConfirm}
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="Confirm Password"
          variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        {error && <p>{error}</p>}
        <Link
          to="/"
          variant="contained"
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          Sign In Instead
        </Link>
      </RegisterForm>
    </>
  );
}

export default RegisterUser;

const RegisterForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;

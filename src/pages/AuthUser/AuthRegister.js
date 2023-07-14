import domainPath from "../../domainPath";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";

import styled from "styled-components";
import { ArrowBack } from "@mui/icons-material";

function RegisterUser() {
  const history = useHistory();
  const [error, setError] = useState("");

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");

  const [continueForm, setContinueForm] = useState(false);

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

    const url = `${domainPath}/user/register`;
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
        sx={{
          color: "#49C5B6",
          marginTop: "1rem",

          fontFamily: "Ultra",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "36px",
        }}
      >
        Sign Up
      </Typography>
      <RegisterForm onSubmit={registerUser}>
        {!continueForm && (
          <>
            <TextField
              onChange={firstNameChangeHandler}
              value={enteredFirstName}
              type="text"
              label="First Name"
              variant="outlined"
            />
            <br />
            <TextField
              onChange={lastNameChangeHandler}
              value={enteredLastName}
              type="text"
              label="Last Name"
              variant="outlined"
            />
            <br />
            <TextField
              onChange={emailChangeHandler}
              value={enteredEmail}
              type="email"
              label="Email"
              variant="outlined"
            />
            <br />
            <CustomButton
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                setContinueForm(true);
              }}
            >
              Continue
            </CustomButton>
          </>
        )}
        {continueForm && (
          <>
            <CustomButton
              type="button"
              variant="outlined"
              color="#1976d2"
              onClick={() => {
                setContinueForm(false);
              }}
              sx={{
                margin: " 0 auto 1.5rem auto",
                width: "fit-content",
              }}
            >
              <ArrowBack />
            </CustomButton>
            <TextField
              onChange={passwordChangeHandler}
              value={enteredPassword}
              type="password"
              label="Password"
              variant="outlined"
            />
            <br />
            <TextField
              onChange={passwordConfirmChangeHandler}
              value={enteredPasswordConfirm}
              type="password"
              label="Confirm Password"
              variant="outlined"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                // checked={checked}
                // onChange={handleChange}
                />
              }
              label="I would like to receive your newsletter and other promotional information."
            />
            <br />
            <CustomButton type="submit" variant="contained" color="primary">
              Sign Up
            </CustomButton>
          </>
        )}
        {error && <p>{error}</p>}
        <Link
          to="/"
          variant="contained"
          style={{
            marginTop: "1rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#49C5B6",
            textDecoration: "none",
          }}
        >
          <b>Sign In Instead</b>
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
  margin-top: 0.8rem;
`;

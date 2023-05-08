import domainPath from "../../domainPath";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import { TextField, Typography } from "@mui/material";
import ThemeSelection from "../../components/Reader/ThemeSelection";
import CustomButton from "../../components/UI/CustomButton";

import styled from "styled-components";

function AddReader() {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);
  const history = useHistory();

  const [error, setError] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredTheme, setEnteredTheme] = useState("#FFC354");

  //set readerCtx to main user
  useEffect(() => {
    if (
      readerCtx.currentReaderId !== "" &&
      readerCtx.currentReaderName !== ""
    ) {
      readerCtx.onChangeReader("", "", "");
    }
  }, [readerCtx]);

  const resetForm = () => {
    setEnteredName("");
  };
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const themeChangeHandler = (event) => {
    setEnteredTheme(event.target.value);
  };

  const addReader = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
      body: JSON.stringify({
        reader_name: enteredName,
        theme_color: enteredTheme,
      }),
    };
    try {
      const url = `${domainPath}/reader`;
      await fetch(url, requestOptions);
    } catch (err) {
      setError(err.msg);
    }
    readerCtx.onReaderIsUpdated();
    resetForm();
    history.push("/");
  };

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        sx={{ color: enteredTheme, marginTop: "2rem" }}
      >
        Add Reader
      </Typography>
      <CustomForm onSubmit={addReader}>
        <TextField
          onChange={nameChangeHandler}
          value={enteredName}
          style={{ width: "200px", margin: "5px", marginBottom: "2rem" }}
          type="text"
          label="Name"
          variant="outlined"
          required
        />
        <br />
        <ThemeSelection onChange={themeChangeHandler} value={enteredTheme} />
        <br />
        <CustomButton
          type="submit"
          sx={{ backgroundColor: `${enteredTheme} !important` }}
        >
          Add Reader
        </CustomButton>
      </CustomForm>
      {error && <p>{error}</p>}
    </>
  );
}

export default AddReader;

const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;

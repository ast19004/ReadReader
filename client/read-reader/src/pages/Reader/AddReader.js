import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";

function AddReader() {
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);
  const history = useHistory();

  const [error, setError] = useState("");
  const [enteredName, setEnteredName] = useState("");

  const resetForm = () => {
    setEnteredName("");
  };
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
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
      }),
    };
    try {
      const url = "http://localhost:5000/reader";
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
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
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Add Reader
      </Typography>
      <CustomForm onSubmit={addReader}>
        <TextField
          onChange={nameChangeHandler}
          value={enteredName}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Name"
          variant="outlined"
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add Reader
        </Button>
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

import { useState, useContext, useEffect } from "react";

import { useParams, useHistory, Route } from "react-router-dom";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";

import { TextField, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

import ConfirmDeleteReader from "./ConfirmDeleteReader";

function EditUserForm(props) {
  const params = useParams();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const [error, setError] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const readerName = props.reader.reader_name;

  useEffect(() => {
    setEnteredName(readerName);
  }, [readerName]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const updateReader = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "PUT",
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
      const url = `http://localhost:5000/reader/${params.id}/`;
      await fetch(url, requestOptions);

      props.onClose();
      readerCtx.onReaderIsUpdated();
    } catch (err) {
      setError(err.msg);
    }
  };

  const deleteReader = (event) => {
    setIsConfirmDelete(true);
    history.push(`/reader/${params.id}/edit/confirmDelete`);
  };

  return (
    <>
      {!isConfirmDelete && (
        <>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Update Reader
          </Typography>
          <CustomForm onSubmit={updateReader}>
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
              Submit Changes
            </Button>
          </CustomForm>
          <Button
            onClick={deleteReader}
            variant="contained"
            color="error"
            sx={{ marginTop: "2rem", width: "24px", justifySelf: "center" }}
          >
            <DeleteIcon sx={{ width: "20px" }} />
          </Button>
        </>
      )}
      <Route path={`/reader/:id/edit/confirmDelete`} exact>
        <ConfirmDeleteReader onClose={props.onClose} readerName={readerName} />
      </Route>
      {error && <p>{error}</p>}
    </>
  );
}

export default EditUserForm;

const CustomForm = styled.form`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  margin-top: 2rem;
`;

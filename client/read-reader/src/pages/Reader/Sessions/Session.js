import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AcceptChangesIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import AuthContext from "../../../store/auth-contex";

import styled from "styled-components";

const Session = (props) => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [enteredDate, setEnteredDate] = useState(props.date);
  const [enteredDuration, setEnteredDuration] = useState(props.minutesRead);

  const handleDeleteSession = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    try {
      const url = `http://localhost:5000/reader/${props.readerId}/session/${props.id}/`;
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      props.onUpdate();
    } catch (err) {
      console.log(err.msg);
    }
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const durationChangeHandler = (event) => {
    setEnteredDuration(event.target.value);
  };

  const updateSessionHandler = async (event) => {
    setEdit(false);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
      body: JSON.stringify({
        session_date: enteredDate,
        reading_duration: enteredDuration,
      }),
    };
    const url = `http://localhost:5000/reader/session/${props.id}/`;
    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      props.onUpdate();
    } catch (err) {
      console.log(err.msg);
    }
  };

  return (
    <li>
      {edit ? (
        <SessionListData>
          <li>
            <TextField
              onChange={dateChangeHandler}
              value={enteredDate}
              type="text"
              label="Date"
              variant="outlined"
              required
              sx={{ backgroundColor: "white", margin: "1rem" }}
            />
          </li>
          <li>
            <TextField
              onChange={durationChangeHandler}
              value={enteredDuration}
              type="text"
              label="Minutes"
              variant="outlined"
              required
              sx={{ backgroundColor: "white", margin: "1rem 0" }}
            />
          </li>
          <li>
            <Button>
              <AcceptChangesIcon
                onClick={updateSessionHandler}
                fontSize="large"
              />
            </Button>
          </li>
        </SessionListData>
      ) : (
        <SessionListData>
          <li>
            <Button onClick={handleDeleteSession}>
              <DeleteIcon />
            </Button>
          </li>
          <li>{props.date}</li>
          <li>
            {props.minutesRead} {props.minutesRead === 1 ? "min" : "mins"}
          </li>
          <li>
            <Button>
              <EditIcon onClick={() => setEdit(true)} />
            </Button>
          </li>
        </SessionListData>
      )}
    </li>
  );
};

export default Session;

const SessionListData = styled.ul`
  display: grid;
  grid-template-columns: auto 125px 75px auto;
  align-items: center;
  grid-gap: 1rem;
  background-color: rgba(136, 136, 136, 0.2);
`;

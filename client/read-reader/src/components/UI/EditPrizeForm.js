import { useState, useContext, useEffect } from "react";

import AuthContext from "../../store/auth-contex";
import PrizeContext from "../../store/prize-context";

import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import styled from "styled-components";

function EditPrizeForm(props) {
  const authCtx = useContext(AuthContext);
  const prizeCtx = useContext(PrizeContext);

  const [error, setError] = useState("");

  const [readers, setReaders] = useState();
  const [userHasReader, setUserHasReaders] = useState(false);

  const [enteredName, setEnteredName] = useState("");
  const [enteredReadingRequirement, setEnteredReadingRequirement] =
    useState("");
  const [selectedReaders, setSelectedReaders] = useState([]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const readingRequirementChangeHandler = (event) => {
    setEnteredReadingRequirement(event.target.value);
  };

  //Get original info from prize to be edited
  useEffect(() => {
    const url = `http://localhost:5000/prize/${props.prizeId}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };

    const fetchPrizeData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      const prize = resData.prize;
      const prizeReaderIds = prize.readers.map((reader) => reader.readerId);

      setEnteredName(prize.prize_name);
      setEnteredReadingRequirement(prize.reading_requirement);
      prizeReaderIds.forEach((id) =>
        setSelectedReaders((prevReaders) => [...prevReaders, id])
      );
    };

    fetchPrizeData().catch((err) => {
      setError(err.msg);
    });
  }, [authCtx.token, props.prizeId]);

  //Get all readers associated with this user
  useEffect(() => {
    const url = "http://localhost:5000/readers";
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };

    const fetchReaderData = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      const loadedReaders = resData.readers.map((reader) => {
        return {
          id: reader["_id"],
          name: reader["reader_name"],
        };
      });
      setReaders(loadedReaders);
      setUserHasReaders(loadedReaders.length !== 0);
    };

    fetchReaderData().catch((err) => {
      setError(err.msg);
    });
  }, [authCtx.token]);

  //Save currently selected readers in state
  const handleReaderSelection = (event) => {
    const { id, checked } = event.target;

    if (checked) {
      setSelectedReaders((prevReaders) => [...prevReaders, id]);
    } else {
      setSelectedReaders((prevReaders) =>
        prevReaders.filter((readerId) => readerId !== id)
      );
    }
  };

  //Update prize with new inputs
  const handlePrizeUpdate = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
      body: JSON.stringify({
        prize_name: enteredName,
        reading_requirement: +enteredReadingRequirement,
        readers: selectedReaders,
      }),
    };
    const url = `http://localhost:5000/prize/${props.prizeId}`;

    try {
      await fetch(url, requestOptions);
      prizeCtx.onPrizeIsUpdated();
      props.onClose();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Update Prize
      </Typography>
      {userHasReader && (
        <CustomForm onSubmit={handlePrizeUpdate}>
          <TextField
            multiline
            onChange={nameChangeHandler}
            value={enteredName}
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Prize Name/ Description"
            variant="outlined"
            required
          />
          <br />
          <TextField
            onChange={readingRequirementChangeHandler}
            value={enteredReadingRequirement}
            style={{ width: "300px", margin: "5px" }}
            type="number"
            inputProps={{ min: 1 }}
            label="Reading Requirement (minutes)"
            variant="outlined"
            required
          />
          <br />
          <FormGroup
            sx={{
              border: "1px solid rgba(136, 136, 136, 0.5)",
              padding: "1rem",
              borderRadius: "5px",
            }}
          >
            <Typography sx={{ marginBottom: "1rem" }}>
              Add prize to these readers:
            </Typography>
            {readers.map((reader) => (
              <FormControlLabel
                key={reader.id}
                control={
                  <Checkbox
                    id={reader.id}
                    onChange={handleReaderSelection}
                    checked={selectedReaders.includes(reader.id)}
                  />
                }
                label={reader.name}
              />
            ))}
          </FormGroup>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Update Prize
          </Button>
          {error && <p>{error.message}</p>}
        </CustomForm>
      )}
    </>
  );
}

export default EditPrizeForm;

const CustomForm = styled.form`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  margin-top: 2rem;
`;

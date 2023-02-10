import domainPath from "../../domainPath";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";
import PrizeContext from "../../store/prize-context";

import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { Person, PersonAdd, ArrowRightAlt } from "@mui/icons-material";

import CustomButton from "../../components/UI/CustomButton";

import prizeSvg from "../../assets/Prize/prize.svg";

import styles from "./AddPrize.module.css";

function AddPrize() {
  const authCtx = useContext(AuthContext);
  const prizeCtx = useContext(PrizeContext);
  const readerCtx = useContext(ReaderContext);
  const history = useHistory();

  const [error, setError] = useState("");
  const [readers, setReaders] = useState();
  const [enteredName, setEnteredName] = useState("");
  const [enteredReadingRequirement, setEnteredReadingRequirement] =
    useState("");
  const [selectedReaders, setSelectedReaders] = useState([]);
  const [enteredImagePath, setEnteredImagePath] = useState("");

  const [userHasReader, setUserHasReaders] = useState(false);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const readingRequirementChangeHandler = (event) => {
    setEnteredReadingRequirement(event.target.value);
  };

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

  const imagePathChangeHandler = (event) => {
    const imagePath = event.target.value.substr(12);
    setEnteredImagePath(imagePath);
  };

  //set readerCtx to main user
  useEffect(() => {
    if (
      readerCtx.currentReaderId !== "" &&
      readerCtx.currentReaderName !== ""
    ) {
      readerCtx.onChangeReaderId("");
      readerCtx.onChangeReaderName("");
    }
  }, []);

  useEffect(() => {
    const url = `${domainPath}/readers`;
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

  const addPrize = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
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
    const url = `${domainPath}/prize`;

    try {
      await fetch(url, requestOptions);
      prizeCtx.onPrizeIsUpdated();
    } catch (err) {
      setError(err);
    }
    history.push("/prizes");
  };

  return (
    <>
      <img src={prizeSvg} alt="Gift wrapped with a bow" />
      <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "2rem" }}
      >
        Add a prize
      </Typography>
      {userHasReader ? (
        <form id={styles["addPrize-form"]} onSubmit={addPrize}>
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
          <Typography
            sx={{
              paddingBottom: ".2rem",
              textAlign: "center",
              backgroundColor: "rgb(245, 245,245)",
              borderRadius: "25px",
            }}
          >
            {enteredImagePath}
          </Typography>
          <TextField
            id="input_image"
            onChange={imagePathChangeHandler}
            style={{ display: "none" }}
            type="file"
            accept="image/png, image/jpg"
            variant="outlined"
          />

          <CustomButton
            type="button"
            variant="outlined"
            color="#1976d2"
            onClick={() => {
              document.getElementById("input_image").click();
            }}
          >
            Upload Image
          </CustomButton>
          <br />
          <>
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
                    <Checkbox id={reader.id} onChange={handleReaderSelection} />
                  }
                  label={reader.name}
                />
              ))}
            </FormGroup>

            <br />
          </>
          <CustomButton type="submit">Add Prize</CustomButton>
          {error && <p>{error.message}</p>}
        </form>
      ) : (
        <>
          <Typography
            align="center"
            variant="h4"
            component="p"
            sx={{ color: "gray", marginTop: "2rem" }}
          >
            Please add reader(s) before adding prizes.
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "gray",
              marginTop: "1rem",
            }}
          >
            <Person /> <ArrowRightAlt /> <PersonAdd />
            &nbsp;Add Reader
          </Typography>
        </>
      )}
    </>
  );
}

export default AddPrize;

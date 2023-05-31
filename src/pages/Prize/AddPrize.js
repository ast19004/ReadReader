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
import {
  Person,
  PersonAdd,
  ArrowRightAlt,
  ArrowBack,
} from "@mui/icons-material";

import CustomButton from "../../components/UI/CustomButton";

import AddPrizeImage from "../../components/Prize/AddPrizeImage";
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
  const [file, setfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [userHasReader, setUserHasReaders] = useState(false);

  const [continueForm, setContinueForm] = useState(false);

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

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];
    setfile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const continueFormHandler = () => {
    if (enteredName || enteredReadingRequirement) {
      setError("");
      setContinueForm(true);
    } else {
      setError({ message: "Please enter a prize name & reading requirement" });
    }
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

    const uploadData = new FormData();
    uploadData.append("prize_image", file);
    const uploadRequestOptions = {
      method: "POST",
      body: uploadData,
    };

    const url = `${domainPath}/prize`;

    try {
      const res = await fetch(`${domainPath}/upload`, uploadRequestOptions);
      if (!res.ok) {
        throw new Error("Error with posting upload");
      }
      const uploadedFile = await res.json();
      console.log(`uploadedFile : ${uploadedFile.filename}`);

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
          prize_image: uploadedFile.filename,
        }),
      };
      const res2 = await fetch(url, requestOptions);
      if (!res2.ok) {
        throw new Error("Error posting new prize");
      }
      prizeCtx.onPrizeIsUpdated();
    } catch (err) {
      console.log(err.msg);
      setError(err.msg);
    }
    history.push("/prizes");
  };

  return (
    <>
      <Typography
        align="center"
        variant="h2"
        sx={{ color: "gray", marginTop: "5rem" }}
      >
        Add a prize
      </Typography>
      {error && (
        <Typography
          align="center"
          sx={{ color: "red", marginTop: "1rem", marginBottom: "-1.5rem" }}
        >
          {error.message}
        </Typography>
      )}
      {userHasReader ? (
        <form
          id={styles["addPrize-form"]}
          onSubmit={addPrize}
          encType="multipart/form-data"
        >
          {!continueForm ? (
            <>
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

              <TextField
                id="input_image"
                name="prize_image"
                onChange={fileChangeHandler}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                variant="outlined"
              />
              <AddPrizeImage
                file={file}
                defaultImage={prizeSvg}
                previewUrl={previewUrl}
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
              <CustomButton
                type="button"
                onClick={continueFormHandler}
                sx={{ marginTop: "2rem" }}
              >
                Continue
              </CustomButton>
              <br />
            </>
          ) : (
            <>
              <>
                <CustomButton
                  type="button"
                  variant="outlined"
                  color="#1976d2"
                  onClick={() => {
                    setContinueForm(false);
                  }}
                  sx={{
                    margin: " 0 auto 2rem auto",
                    width: "fit-content",
                  }}
                >
                  <ArrowBack />
                </CustomButton>
                <AddPrizeImage
                  file={file}
                  defaultImage={prizeSvg}
                  previewUrl={previewUrl}
                />
                <FormGroup
                  sx={{
                    // border: "1px solid rgba(136, 136, 136, 0.5)",
                    padding: "1rem",
                    // borderRadius: "5px",
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
                        />
                      }
                      label={reader.name}
                    />
                  ))}
                </FormGroup>

                <br />
              </>
              <CustomButton type="submit">Add Prize</CustomButton>
            </>
          )}
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

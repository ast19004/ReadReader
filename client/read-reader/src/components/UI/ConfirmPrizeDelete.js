import { useState, useContext } from "react";
import { Typography, Button, TextField } from "@mui/material";

import AuthContext from "../../store/auth-contex";
import PrizeContext from "../../store/prize-context";

const ConfirmPrizeDelete = (props) => {
  const authCtx = useContext(AuthContext);
  const prizeCtx = useContext(PrizeContext);

  const [error, setError] = useState("");

  const handleCancel = () => {
    props.onClose();
  };
  const handleDelete = async () => {
    props.onClose(true);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    try {
      const url = `http://localhost:5000/prize/${props.prizeId}/`;
      await fetch(url, requestOptions);
    } catch (err) {
      setError(err.msg);
    }
  };

  return (
    <>
      <TextField
        multiline
        readOnly
        value={props.prizeName}
        style={{ width: "200px", margin: "5px", margin: "2rem auto 0 auto" }}
        type="text"
        label="Name"
        variant="outlined"
        required
      />
      <Typography sx={{ marginTop: "2rem" }}>
        Are you sure you want to delete this prize?
      </Typography>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
      {error && <p>error</p>}
    </>
  );
};

export default ConfirmPrizeDelete;

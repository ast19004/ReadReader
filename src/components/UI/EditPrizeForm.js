import domainPath from "../../domainPath";
import { useState, useContext, useEffect } from "react";

import AuthContext from "../../store/auth-contex";

import AddPrize from "../../pages/Prize/AddPrize";

function EditPrizeForm(props) {
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredReadingRequirement, setEnteredReadingRequirement] =
    useState("");
  const [selectedReaders, setSelectedReaders] = useState([]);
  const [file, setFile] = useState(null);

  //Get original info from prize to be edited
  useEffect(() => {
    const url = `${domainPath}/prize/${props.prizeId}`;
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
      const prizeData = resData.prize;
      const prizeReaderIds = prizeData.readers.map((reader) => reader.readerId);

      setEnteredName(prizeData.prize_name);
      setEnteredReadingRequirement(prizeData.reading_requirement);
      prizeReaderIds.forEach((id) =>
        setSelectedReaders((prevReaders) => [...prevReaders, id])
      );
      setFile(prizeData.prize_image);
    };

    fetchPrizeData().catch((err) => {
      setError(err.msg);
    });
  }, [authCtx.token, props.prizeId]);

  return (
    <AddPrize
      edit={true}
      prizeId={props.prizeId}
      onClose={props.onClose}
      title="Update Prize"
      enteredName={enteredName}
      enteredReadingRequirement={enteredReadingRequirement}
      selectedReaders={selectedReaders}
      file={file}
      error={error}
    />
  );
}

export default EditPrizeForm;

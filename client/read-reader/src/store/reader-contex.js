import React, { useState } from "react";

const ReaderContext = React.createContext({
  isUpdated: false,
  currentReaderId: "",
  currentReaderName: "",
  onChangeReaderId: () => {},
  onChangeReaderName: () => {},
  onChangeIsUpdated: () => {},
});

export const ReaderContextProvider = (props) => {
  // currentReaderName & Id will be '' for an authUser
  const [id, setChangeId] = useState("");
  const [name, setChangeName] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const changeReaderHandler = (id) => {
    setChangeId(id);
  };

  const changeReaderNameHandler = (name) => {
    setChangeName(name);
  };

  const changeIsUpdatedHandler = (bool) => {
    setIsUpdated(bool);
  };

  return (
    <ReaderContext.Provider
      value={{
        isUpdated: isUpdated,
        currentReaderId: id,
        currentReaderName: name,
        onChangeReaderId: changeReaderHandler,
        onChangeReaderName: changeReaderNameHandler,
        onChangeIsUpdated: changeIsUpdatedHandler,
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  );
};

export default ReaderContext;

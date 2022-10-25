import React, { useState } from "react";

const ReaderContext = React.createContext({
  isReader: false,
  currentReaderId: "",
  currentReaderName: "",
  onChangeReaderId: () => {},
  onChangeReaderName: () => {},
});

export const ReaderContextProvider = (props) => {
  // currentReaderName & Id will be '' for an authUser
  const [id, setChangeId] = useState("");
  const [name, setChangeName] = useState("");

  const isReader = !!id;

  const changeReaderHandler = (id) => {
    setChangeId(id);
  };

  const changeReaderNameHandler = (name) => {
    setChangeName(name);
  };

  return (
    <ReaderContext.Provider
      value={{
        isReader: isReader,
        currentReaderId: id,
        currentReaderName: name,
        onChangeReaderId: changeReaderHandler,
        onChangeReaderName: changeReaderNameHandler,
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  );
};

export default ReaderContext;

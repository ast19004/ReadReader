import React, { useState } from "react";

const ReaderContext = React.createContext({
  isUpdated: 0,
  currentReaderId: "",
  currentReaderName: "",
  onChangeReaderId: () => {},
  onChangeReaderName: () => {},
  onReaderIsUpdated: () => {},
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

  const isUpdatedHandler = () => {
    setIsUpdated((prevUpdated) => prevUpdated++);
  };

  return (
    <ReaderContext.Provider
      value={{
        isUpdated: isUpdated,
        currentReaderId: id,
        currentReaderName: name,
        onChangeReaderId: changeReaderHandler,
        onChangeReaderName: changeReaderNameHandler,
        onReaderIsUpdated: isUpdatedHandler,
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  );
};

export default ReaderContext;

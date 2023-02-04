import React, { useState } from "react";

const ReaderContext = React.createContext({
  isUpdated: 0,
  currentReaderId: "",
  currentReaderName: "",
  currentTheme: "",
  onChangeReader: () => {},
  onChangeReaderId: () => {},
  onChangeReaderName: () => {},
  onChangeReaderTheme: () => {},
  onReaderIsUpdated: () => {},
});

export const ReaderContextProvider = (props) => {
  // currentReaderName & Id will be '' for an authUser
  const [id, setChangeId] = useState("");
  const [name, setChangeName] = useState("");
  const [theme, setChangeReaderTheme] = useState("");
  const [isUpdated, setIsUpdated] = useState(0);

  const changeReaderIdHandler = (id) => {
    setChangeId(id);
  };

  const changeReaderNameHandler = (name) => {
    setChangeName(name);
  };

  const changeReaderThemeHandler = (theme) => {
    setChangeReaderTheme(theme);
  };

  const changeReaderHandler = (id, name, theme) => {
    setChangeId(id);
    setChangeName(name);
    setChangeReaderTheme(theme);
    console.log(`theme: ${theme}`);
  };

  const isUpdatedHandler = () => {
    setIsUpdated((prevUpdated) => (prevUpdated += 1));
  };

  return (
    <ReaderContext.Provider
      value={{
        isUpdated: isUpdated,
        currentReaderId: id,
        currentReaderName: name,
        currentTheme: theme,
        onChangeReader: changeReaderHandler,
        onChangeReaderId: changeReaderIdHandler,
        onChangeReaderName: changeReaderNameHandler,
        onChangeReaderTheme: changeReaderThemeHandler,
        onReaderIsUpdated: isUpdatedHandler,
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  );
};

export default ReaderContext;

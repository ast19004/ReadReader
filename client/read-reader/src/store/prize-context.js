import React, { useState } from "react";

const PrizeContext = React.createContext({
  isUpdated: 0,
  onPrizeIsUpdated: () => {},
});

export const PrizeContextProvider = (props) => {
  // currentReaderName & Id will be '' for an authUser
  const [isUpdated, setIsUpdated] = useState(0);

  const isUpdatedHandler = () => {
    setIsUpdated((prevUpdated) => (prevUpdated += 1));
  };

  return (
    <PrizeContext.Provider
      value={{
        isUpdated: isUpdated,
        onPrizeIsUpdated: isUpdatedHandler,
      }}
    >
      {props.children}
    </PrizeContext.Provider>
  );
};

export default PrizeContext;

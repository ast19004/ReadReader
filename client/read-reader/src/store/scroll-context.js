import React, { useState, useEffect } from "react";

const ScrollContext = React.createContext({
  offsetX: 0,
  offsetY: 0,
});

export const ScrollContextProvider = (props) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const onScrollX = () => setOffsetX(window.pageXOffset);
    const onScrollY = () => setOffsetY(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScrollX);
    window.addEventListener("scroll", onScrollX, { passive: true });

    window.removeEventListener("scroll", onScrollY);
    window.addEventListener("scroll", onScrollY, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollX);
      window.removeEventListener("scroll", onScrollY);
    };
  }, [offsetX, offsetY]);

  return (
    <ScrollContext.Provider
      value={{
        offsetX: offsetX,
        offsetY: offsetY,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;

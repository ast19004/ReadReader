import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  logoutTimeoutId: 0,
  onLogout: () => {},
  onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [timeoutId, setTimeoutId] = useState(0);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    clearTimeout(timeoutId);
  };

  const loginHandler = (token) => {
    setToken(token);
    setTimeoutId(
      setTimeout(() => {
        logoutHandler();
      }, "14000000")
    );
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: userIsLoggedIn,
        logoutTimeoutId: timeoutId,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

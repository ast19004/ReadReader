import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const logoutHandler = () => {
    setToken(null);
    clearTimeout(timeoutId);
  };

  const loginHandler = (token) => {
    setToken(token);
    setTimeoutId(
      setTimeout(() => {
        logoutHandler();
        history.push("/");
      }, "1370000")
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

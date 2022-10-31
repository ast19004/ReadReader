import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  onLogout: () => {},
  onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    //TODO: clear setTimeout for logout, set new one on login
  };

  const loginHandler = (token) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: userIsLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

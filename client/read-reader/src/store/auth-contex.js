import React ,{useEffect, useState } from 'react';

import { Redirect } from "react-router-dom";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout : () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if(storedUserLoggedInInformation === '1'){
            setIsLoggedIn(true);
        }
    }
,[]);

    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      <Redirect to="/" exact/>
    };
  
    const loginHandler = () => {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
            );
};

export default AuthContext;
import { useState, useContext } from "react";

import AuthContext from "../../store/auth-contex";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import styled from "styled-components";

function AuthLogin() {
    const authCtx = useContext(AuthContext);

    const url = "http://localhost:5000/user/login";

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const resetForm = () => {
        setEnteredEmail('');
        setEnteredPassword('');
    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        let token = null;
        
        try{
        const res = fetch(url, {
            method: 'POST',
            header: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : enteredEmail,
                "password" : enteredPassword
            })
        });
        if (res.status === 422){
            throw new Error('Validation failed.');
        }
        if (res.status !== 200 & res.status !== 201){
            throw new Error('Could not authenticate you!');
        }
        const resData = res.json();
        token = resData.token;
    } catch(err){console.log(err)};

    authCtx.onLogin(token);
    resetForm();
   }

    return (
        <LoginForm onSubmit={handleLogin} >
            <TextField
            onChange={emailChangeHandler}
            value={enteredEmail}
            style={{ width: "200px", margin: "5px" }}
            type="email"
            label="Email"
            variant="outlined"
            />
            <br />
            <TextField
            onChange={passwordChangeHandler}
            value={enteredPassword}
            style={{ width: "200px", margin: "5px" }}
            type="password"
            label="Password"
            variant="outlined"
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
            Login
            </Button>
        </LoginForm>
    );
  }
  
  export default AuthLogin;

  const LoginForm = styled.form`
    display: grid;
    grid-template-column: auto;
    justify-content: center;
    margin-top: 2rem;
  `;


import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import styled from "styled-components";

function AuthLogin() {
    const loginUser = (event) => {
        alert('User logged in!');
    };

    return (
        <LoginForm onSubmit={loginUser} >
            <TextField
            style={{ width: "200px", margin: "5px" }}
            type="email"
            label="Email"
            variant="outlined"
            />
            <br />
            <TextField
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


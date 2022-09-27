import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function RegisterUser() {
    const registerUser = (event) => {
        event.preventDefault();
        alert('User Registered');
    };

    return (
        <RegisterForm onSubmit={registerUser}>
        <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="First Name"
        variant="outlined"
        />
        <br />
        <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Last Name"
        variant="outlined"
        />
        <br />
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
        <TextField
        style={{ width: "200px", margin: "5px" }}
        type="password"
        label="Confirm Password"
        variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
        Register
        </Button>
    </RegisterForm>
    );
  }
  
  export default RegisterUser;

  const RegisterForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


import { useState } from 'react'; 

import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function RegisterUser() {
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');

    const resetForm = () => {
        setEnteredFirstName('')
        setEnteredLastName('')
        setEnteredEmail('');
        setEnteredPassword('');
        setEnteredPasswordConfirm('');
    }
    const firstNameChangeHandler = (event) => {
        setEnteredFirstName(event.target.value);
    };

    const lastNameChangeHandler = (event) => {
        setEnteredLastName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const passwordConfirmChangeHandler = (event) => {
        setEnteredPasswordConfirm(event.target.value);
    };

    const registerUser = (event) => {
        event.preventDefault();

        const newUser = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            password: enteredPassword,
            passwordConfirm: enteredPasswordConfirm
        };
        alert(`New User: ${JSON.stringify(newUser)}`);
        resetForm();
    };

    return (
        <RegisterForm onSubmit={registerUser}>
        <TextField
        onChange={firstNameChangeHandler}
        value={enteredFirstName}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="First Name"
        variant="outlined"
        />
        <br />
        <TextField
        onChange={lastNameChangeHandler}
        value={enteredLastName}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Last Name"
        variant="outlined"
        />
        <br />
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
        <TextField
        onChange={passwordConfirmChangeHandler}
        value={enteredPasswordConfirm}
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


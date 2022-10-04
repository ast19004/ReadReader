import { useState } from 'react'; 

import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function AddReader() {
    const [enteredName, setEnteredName] = useState('');

    const resetForm = () => {
        setEnteredName('')
    }
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };



    const addReader = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                reader_name: enteredName
            })
        };
        try{
        const url = "http://localhost:5000/reader";
        const res = await fetch(url, requestOptions);

    } catch(err){
        console.log(err);
    }
        resetForm();
    };

    return (
        <RegisterForm onSubmit={addReader}>
        <TextField
        onChange={nameChangeHandler}
        value={enteredName}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Name"
        variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
        Register
        </Button>
    </RegisterForm>
    );
  }
  
  export default AddReader;

  const RegisterForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


import { useState } from 'react'; 

import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function UpdateReader() {
    const [enteredName, setEnteredName] = useState('');

    const resetForm = () => {
        setEnteredName('')
    }
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };



    const updateReader = async (event) => {
        event.preventDefault();
    };

    return (
        <CustomForm onSubmit={updateReader}>
        <TextField
        onChange={nameChangeHandler}
        value={enteredName ? enteredName : 'Ronnie'}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Name"
        variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
        Update Reader
        </Button>
    </CustomForm>
    );
  }
  
  export default UpdateReader;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


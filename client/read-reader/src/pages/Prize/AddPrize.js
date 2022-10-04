import { useState } from 'react'; 

import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function AddPrize() {
    const [enteredName, setEnteredName] = useState('');
    const [enteredReadingRequirement, setEnteredReadingRequirement] = useState('');

    const resetForm = () => {
        setEnteredName('')
    }
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const readingRequirementChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };



    const addPrize = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prize_name: enteredName,
                prize_reading_requirement: +enteredReadingRequirement
            })
        };
        try{
        const url = "http://localhost:5000/prize";
        const res = await fetch(url, requestOptions);

    } catch(err){
        console.log(err);
    }
        resetForm();
    };

    return (
        <CustomForm onSubmit={addPrize}>
        <TextField
        onChange={nameChangeHandler}
        value={enteredName}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Prize Name"
        variant="outlined"
        />
        <br />
        <TextField
        onChange={readingRequirementChangeHandler}
        value={enteredReadingRequirement}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Reading Requirement (minutes)"
        variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
        Add Prize
        </Button>
    </CustomForm>
    );
  }
  
  export default AddPrize;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


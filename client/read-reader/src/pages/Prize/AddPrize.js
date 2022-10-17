import { useState, useContext, useEffect, useRef } from 'react'; 

import AuthContext from '../../store/auth-contex';

import { Typography, FormGroup, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
import styled from 'styled-components';

function AddPrize() {
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState(''); 
    const [readers, setReaders] = useState(); 
    const [enteredName, setEnteredName] = useState('');
    const [enteredReadingRequirement, setEnteredReadingRequirement] = useState('');
    const [selectedReaders, setSelectedReaders] = useState([]);

    const resetForm = () => {
        setEnteredName('')
    }
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const readingRequirementChangeHandler = (event) => {
        setEnteredReadingRequirement(event.target.value);
    };

    const handleReaderSelection = (event) => {
        const {id, checked} = event.target;

        if(checked){
            setSelectedReaders(prevReaders => [...prevReaders, id]);

        }else{
            setSelectedReaders(prevReaders => {
                console.log(JSON.stringify(prevReaders));
                return prevReaders.filter(readerId => readerId !== id)
            });
    };
    };

    useEffect(()=> {
        const url = "http://localhost:5000/readers";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        
        const fetchReaderData = async() => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();
            
            const loadedReaders = resData.readers.map(reader => {
                return {
                    id: reader['_id'],
                    name: reader['reader_name'],
            }
        });
            setReaders(loadedReaders);
            setSelectedReaders(loadedReaders.map(reader => reader.id));
            };

            fetchReaderData().catch((err) => {
                setError(err.msg);
            });
    }, []);



    const addPrize = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            },
            body: JSON.stringify({
                prize_name: enteredName,
                prize_reading_requirement: +enteredReadingRequirement,
                readers: selectedReaders
            })
        };
        const url = "http://localhost:5000/prize";
        console.log(`requestOptions: ${JSON.stringify(requestOptions)}`);
        try{
        const res = await fetch(url, requestOptions);

    } catch(err){
        setError(err );
    }
        resetForm();
    };

    return (
        <>
        <Typography align="center" variant="h2" sx={{color: "gray", marginTop: '2rem'}}>Add Prize</Typography>
        <CustomForm onSubmit={addPrize}>
            <TextField
            multiline
            onChange={nameChangeHandler}
            value={enteredName}
            style={{ width: "300px", margin: "5px" }}
            type="text"
            label="Prize Name/ Description"
            variant="outlined"
            required
            />
            <br />
            <TextField
            onChange={readingRequirementChangeHandler}
            value={enteredReadingRequirement}
            style={{ width: "300px", margin: "5px" }}
            type="number"
            inputProps={{min : 1 }}
            label="Reading Requirement (minutes)"
            variant="outlined"
            required
            />
            <br />
            { readers && 
            <>
            <FormGroup sx={{border: '1px solid rgba(136, 136, 136, 0.5)', padding: '1rem', borderRadius: '5px'}}>
                <Typography sx={{marginBottom: '1rem'}}>Add prize to these readers:</Typography>
                {readers.map(reader => <FormControlLabel key={reader.id} control={<Checkbox id={reader.id} onChange={handleReaderSelection} checked/>} label={reader.name}/>)}
            </FormGroup>
            <br />
            </>
            }
            <Button type="submit" variant="contained" color="primary">
            Add Prize
            </Button>
            {error && <p>{error.message}</p>}
        </CustomForm>
        </>
    );
  }
  
  export default AddPrize;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


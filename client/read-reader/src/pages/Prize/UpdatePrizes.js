import { useState, useContext, useEffect } from 'react'; 

import { useParams } from 'react-router-dom';

import AuthContext from '../../store/auth-contex';

import { Typography, FormGroup, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
import styled from 'styled-components';

function UpdatePrize() {
    const params = useParams();
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState(''); 
    const [readers, setReaders] = useState(); 
    const [enteredPrizeName, setEnteredPrizeName] = useState('');
    const [enteredReadingRequirement, setEnteredReadingRequirement] = useState('');
    const [selectedReaders, setSelectedReaders] = useState([]);

    const resetForm = () => {
        setEnteredPrizeName('');
    }
    const nameChangeHandler = (event) => {
        setEnteredPrizeName(event.target.value);
    };

    const readingRequirementChangeHandler = (event) => {
        setEnteredReadingRequirement(event.target.value);
    };

    const handleReaderSelection = (event) => {
        const {id, checked} = event.target;

        if(checked){
            setSelectedReaders(prevReaders => [...prevReaders, id]);

        }else{
            setSelectedReaders(prevReaders => {prevReaders.filter(readerId => readerId !== id)});
    };
    };

    useEffect(()=> {
        const url = `http://localhost:5000/prize/${params.prizeId}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        
        const fetchPrizeData = async() => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const loadedPrize = await res.json();
            setEnteredPrizeName(loadedPrize['prize_name']);
            setEnteredReadingRequirement(loadedPrize['reading_requirement']);

            const loadedReaders = loadedPrize.readers.map(reader => reader.readerId);
            setReaders(loadedReaders);
            
            };

            fetchPrizeData().catch((err) => {
                setError(err.msg);
            });
    }, []);



    const modifyPrize = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            },
            body: JSON.stringify({
                prize_name: enteredPrizeName,
                reading_requirement: +enteredReadingRequirement,
                readers: selectedReaders
            })
        };
        const url = `http://localhost:5000/prize/${params.prizeId}`;

        try{
            const res = await fetch(url, requestOptions);
            const resData = await res.json();

    } catch(err){
        setError(err );
    }
        resetForm();
    };

    return (
        <>
        <Typography align="center" variant="h2" sx={{color: "gray", marginTop: '2rem'}}>Modify Prize</Typography>
        <CustomForm onSubmit={modifyPrize}>
            <TextField
            multiline
            onChange={nameChangeHandler}
            value={enteredPrizeName}
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
                {readers.map(reader => <FormControlLabel key={reader.id} control={<Checkbox id={reader.id} onChange={handleReaderSelection}/>} label={reader.name}/>)}
            </FormGroup>
            <br />
            </>
            }
            <Button type="submit" variant="contained" color="primary">
            Submit Changes
            </Button>
            {error && <p>{error.message}</p>}
        </CustomForm>
        </>
    );
  }
  
  export default UpdatePrize;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


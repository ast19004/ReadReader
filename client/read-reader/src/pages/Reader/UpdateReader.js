import { useState, useContext } from 'react'; 

import { useParams, useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-contex';

import { TextField, Button} from '@mui/material';
import styled from 'styled-components';

function UpdateReader() {
    const params = useParams();
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState('');
    const [enteredName, setEnteredName] = useState('');


    const resetForm = () => {
        setEnteredName('')
    }
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const updateReader = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            },
            body: JSON.stringify({
                reader_name: enteredName
            })
        };
        try{
        const url = `http://localhost:5000/reader/${params.id}/`;
        const res = await fetch(url, requestOptions);
        const resData = await res.json();
        const id = resData.updatedReader._id

        history.push(`/reader/${id}`);

    } catch(err){
        setError(err.msg);
    }
        resetForm();
    };

    return (
        <>
        <CustomForm onSubmit={updateReader}>
            <TextField
            onChange={nameChangeHandler}
            value={enteredName}
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Name"
            variant="outlined"
            required
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
            Update Reader
            </Button>
        </CustomForm>
        {error && <p>error</p>}
        </>
    );
  }
  
  export default UpdateReader;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;


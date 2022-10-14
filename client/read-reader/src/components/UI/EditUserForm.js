import { useState, useContext } from 'react'; 

import { useParams, useHistory, Route } from 'react-router-dom';

import AuthContext from '../../store/auth-contex';

import { TextField, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

import ConfirmDelete from './ConfirmDelete';
import { PropaneSharp } from '@mui/icons-material';

function EditUserForm(props) {
    const params = useParams();
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const [error, setError] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);


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

    const deleteReader = (event) => {
        setIsConfirmDelete(true);
        history.push(`/reader/${params.id}/edit/confirmDelete`);
    };

    return (
        <>
        {!isConfirmDelete && 
        <>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Update Reader
        </Typography>
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
            Submit Changes
            </Button>
        </CustomForm>
            <Button onClick={deleteReader} variant="contained" color="error" sx={{marginTop: '2rem', width: '24px', justifySelf: 'center'}}>
                <DeleteIcon sx={{width: '20px'}}/>
            </Button>
         </>}
        <Route path={`/reader/:id/edit/confirmDelete`} exact>
            <ConfirmDelete onClose={props.onClose}/>
        </Route>
        {error && <p>{error}</p>}
        </>
    );
  }
  
  export default EditUserForm;

  const CustomForm = styled.form`
  display: grid;
  grid-template-column: auto;
  justify-content: center;
  margin-top: 2rem;
`;

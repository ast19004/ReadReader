import { useState, useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

import AuthContext from "../../store/auth-contex";

const ConfirmDelete = (props) => {
    const history = useHistory();
    const params = useParams();
    
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');

    const id = params.id;

    const handleCancel = () => {
       props.onClose();
    };

    const handleDelete = async() => {;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        try{
            const url = `http://localhost:5000/reader/${id}/`;
            const res = await fetch(url, requestOptions);
            const resData = await res.json();
            const id = resData.updatedReader._id

            history.push(`/reader/${id}`);

        } catch(err){
            setError(err.msg);
        }

            history.push('/');
    }
    return (
        <>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Delete Reader
        </Typography>
        <TextField
            readonly
            value='Bobby Boy'
            style={{ width: "200px", margin: "5px", margin: '2rem auto 0 auto'}}
            type="text"
            label="Name"
            variant="outlined"
            required
            />
        <Typography sx={{marginTop: '2rem'}}>Are you sure you want to delete this reader?</Typography>
        <Button onClick={handleDelete} color='error'>Delete</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        {error && <p>error</p>}
    </>
    );
};

export default ConfirmDelete;


import { useState, useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";

import AuthContext from "../../store/auth-contex";

const ConfirmDelete = () => {
    const history = useHistory();
    const params = useParams();
    
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');

    const id = params.id;

    const handleCancel = () => {
        history.push('/reader/:id');
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
        <Typography>Are you sure you want to delete this reader?</Typography>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        {error && <p>error</p>}
    </>
    );
};

export default ConfirmDelete;


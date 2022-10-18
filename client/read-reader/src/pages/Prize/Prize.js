import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Prize = (props) => {
    const history = useHistory();
    const [style, setStyle] = useState({display: 'none'});

    const clickable = props.isEditable ? {cursor : 'pointer', height: '100px'} : {cursor : 'default'};


    const handleUpdatePrizeHandler = () => {
        //TODO: change route
        history.push(`/`);
    };

    return (
    <div style={clickable}
    onMouseEnter={e => {
        setStyle({display: 'flex', justifyContent: 'space-between'});
    }}
    onMouseLeave={e => {
        setStyle({display: 'none'})
    }}>
        <div>{props.prizeName}</div>
        <div>{props.readingRequirement}</div>
        {props.isEditable && <div style={style}><Button><DeleteIcon/></Button> <Button><EditIcon onClick={handleUpdatePrizeHandler}/></Button></div>}
    </div>
    );
};

export default Prize;

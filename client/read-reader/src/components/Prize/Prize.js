import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ReaderAuth from '../../store/reader-contex';

import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Prize = (props) => {
    const readerCtx = useContext(ReaderAuth);
    const history = useHistory();

    const isMainUser = !readerCtx.currentReaderId;

    const [style, setStyle] = useState({display: 'none'});

    const listContainerStyle = {height: '150px', listStyle: 'none', padding: '5px'};
    isMainUser ? (listContainerStyle.cursor = 'pointer') : (listContainerStyle.cursor = 'default');


    const handleUpdatePrizeHandler = () => {
        //TODO: change route
        history.push(`/`);
    };

    return (
    <li style={listContainerStyle}
    onMouseEnter={e => {
        setStyle({display: 'flex', justifyContent: 'space-between'});
    }}
    onMouseLeave={e => {
        setStyle({display: 'none'})
    }}>
        <div>{props.prizeName}</div>
        <div>{props.readingRequirement}</div>
        {isMainUser && <div style={style}><Button><DeleteIcon/></Button> <Button><EditIcon onClick={handleUpdatePrizeHandler}/></Button></div>}
    </li>
    );
};

export default Prize;

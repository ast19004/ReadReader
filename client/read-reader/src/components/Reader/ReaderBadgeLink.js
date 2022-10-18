
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ReaderContext from '../../store/reader-contex';
import ReaderBadge from "./ReaderBadge";

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
};

const ReaderBadgeLink = (props) => {
    const readerCtx = useContext(ReaderContext);
    const linkPath = '/reader/' + props.id;

    const onChangeReader = () => {
        readerCtx.onChangeReaderId(props.id);
        readerCtx.onChangeReaderName(props.readerName);
    };

    return (
    <Link to={linkPath} style={linkStyle} onClick={onChangeReader}>
        <ReaderBadge minutesRead={props.minutesRead} coinsEarned={props.coinsEarned} readerName={props.readerName}/>
    </Link>
    );
};

export default ReaderBadgeLink;

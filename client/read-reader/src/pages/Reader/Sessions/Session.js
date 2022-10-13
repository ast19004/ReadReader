const Session = (props) => {
    return(
        <li sx={{ display: 'flex'}}>
            <div>{props.date}&nbsp;&nbsp;{props.minutesRead}</div>
        </li>
    );
};

export default Session;
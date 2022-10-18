const Prize = (props) => {
    return (
    <div>
        <div>{props.prizeName}</div>
        <div>{props.readingRequirement}</div>
    </div>
    );
};

export default Prize;
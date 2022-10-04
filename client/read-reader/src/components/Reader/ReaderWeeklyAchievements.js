import { Typography } from "@mui/material";

const ReaderWeeklyAchievement = (props) => {
    return (
    <div style={props.style}>
        <Typography>Read 6 mins this week</Typography>
        <Typography>Has earned a prize this week!</Typography>
    </div>
    );
};

export default ReaderWeeklyAchievement;
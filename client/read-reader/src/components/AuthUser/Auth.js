import Button from "@mui/material/Button";
import { CardActionArea } from '@mui/material';

function Auth() {
    const imagePath = '/images/fantasybookreading_410.jpg';
    return (
        <CardActionArea>
            <img src={imagePath}></img>
            <Button variant="contained">Login</Button>
            <Button variant="contained">Sign Up</Button>
        </CardActionArea>
    );
  }
  
  export default Auth;


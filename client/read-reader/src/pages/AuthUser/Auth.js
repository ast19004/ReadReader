import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

function Auth() {
    const imagePath = '/images/fantasybookreading_410.jpg';
    return (
        <>
            <img src={imagePath}></img>
            <Button component={Link} to='/login' variant="contained">Login</Button>
            <Button component={Link} to='/register' variant="contained">Sign Up</Button>
        </>
    );
  }
  
  export default Auth;


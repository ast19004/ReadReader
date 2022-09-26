import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

function AuthLogin() {
    const loginUser = (event) => {
        alert('User logged in!');
    };

    return (
        <form onSubmit={loginUser} >
            <TextField
            style={{ width: "200px", margin: "5px" }}
            type="email"
            label="Email"
            variant="outlined"
            />
            <br />
            <TextField
            style={{ width: "200px", margin: "5px" }}
            type="password"
            label="Password"
            variant="outlined"
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
            Login
            </Button>
        </form>
    );
  }
  
  export default AuthLogin;


import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Auth() {
    const smImagePath = '/images/fantasybookreading_410.jpg';
    const mdImagePath = '/images/fantasybookreading_640.jpg';
    const lgImagePath = '/images/fantasybookreading_1280.jpg';
    return (
        <>
            <img 
                src={smImagePath} 
                srcSet={`${mdImagePath} 410w, ${lgImagePath} 640w `} 
                alt="Girl reading next to a tree with a small door in a fantasy forest."/>
            <AuthButtons>
                <Button component={Link} to='/login' variant="contained">Login</Button>
                <Button component={Link} to='/register' variant="contained">Sign Up</Button>
            </AuthButtons>
        </>
    );
  }
  
  export default Auth;

  const AuthButtons = styled.div`
    max-width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 1rem;
    margin: 1rem;
    justify-content: center;
    @media (min-width: 500px) { 
        max-width: 200px;
        margin: 1rem auto;
      }

  `;



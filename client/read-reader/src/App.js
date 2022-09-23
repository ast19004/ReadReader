import {useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header'
import Auth from './components/AuthUser/Auth';
import AuthRegister from './components/AuthUser/AuthRegister';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerUser, setRegisterUser] = useState(false);

  return (
    <div className="App">
      <Header>

      </Header>
      {!isLoggedIn && <Auth/>}
      {registerUser && <AuthRegister/>}
    </div>
  );
}

export default App;


//How to setup multiple view in React while using SPA? 
/* Should it be something like: 
show Login view if loggedIn state false? 
Show Register view if registerUser = true / Register button has been clicked*/
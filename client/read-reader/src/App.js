import {useState} from 'react';

import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Layout/Header'
import Auth from './pages/AuthUser/Auth';
import AuthLogin from './pages/AuthUser/AuthLogin';
import AuthRegister from './pages/AuthUser/AuthRegister'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div className="App">
      <Header/>
      <main>
        <Switch>
            <Route path={'/'} exact>
              {!isLoggedIn && <Auth/>}
            </Route>
            <Route path={'/login'}>
              <AuthLogin/>
            </Route>
            <Route path={'/register'}>
              <AuthRegister/>
            </Route>
            <Route path={'/reader'}> 
              <div>Welcome Reader</div>
            </Route>
          </Switch>
      </main>
    </div>
  );
}

export default App;


//How to setup multiple view in React while using SPA? 
/* Should it be something like: 
show Login view if loggedIn state false? 
Show Register view if registerUser = true / Register button has been clicked*/
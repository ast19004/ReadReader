import { useContext} from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import AuthProvider from './store/auth-contex'
import Header from './components/Layout/Header';
import Auth from './pages/AuthUser/Auth';
import AuthLogin from './pages/AuthUser/AuthLogin';
import AuthRegister from './pages/AuthUser/AuthRegister'

function App() {
  const authCtx = useContext(AuthProvider);

  return (
      <>
        <Header/>
        <main>
          <Switch>
              <Route path={'/'} exact>
                {!authCtx.isLoggedIn && <Auth/>}
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
      </>
  );
}

export default App;


//How to setup multiple view in React while using SPA? 
/* Should it be something like: 
show Login view if loggedIn state false? 
Show Register view if registerUser = true / Register button has been clicked*/
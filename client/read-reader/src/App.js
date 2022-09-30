import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext} from 'react';

import './App.css';
import AuthProvider from './store/auth-contex'
import Header from './components/Layout/Header';
import Auth from './pages/AuthUser/Auth';
import AuthLogin from './pages/AuthUser/AuthLogin';
import AuthRegister from './pages/AuthUser/AuthRegister'
import AuthWelcome from './pages/AuthUser/AuthWelcome'
import Settings from './pages/AuthUser/Settings'

import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const authCtx = useContext(AuthProvider);

  //The final Route sends any undefined route to the initial Auth: login/signup page
  return (
      <>
        <Header/>
        <main>
          <Switch>
              <Route path={'/'} exact>
                {!authCtx.isLoggedIn ? <Auth/> : <AuthWelcome/>}
              </Route>
              <Route path={'/register'}>
                <AuthRegister/>
              </Route>
              <Route path={'/login'}>
              <AuthLogin/>
              </Route>

              <ProtectedRoute path={'/reader'} redirectPath={'/'}>
                <div>Welcome Reader</div>
              </ProtectedRoute>

              <ProtectedRoute path={'/reader'} redirectPath={'/'}>
                <Settings/>
              </ProtectedRoute>

              <Route path={'*'}>
                <Redirect to='/'/>
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
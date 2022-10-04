import { useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthProvider from '../../store/auth-contex';

const ProtectedRoute = (props) => {
    // TODO: change redirectPath in Protected Route and set 404 page instead?
    const authCtx = useContext(AuthProvider);
        if(!authCtx.isLoggedIn){
            return <Route path={props.path} exact={props.exact}><Redirect to={props.redirectPath}/></Route>
        }
        return <Route path={props.path}>{props.children}</Route>
};

export default ProtectedRoute;
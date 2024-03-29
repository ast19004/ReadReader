import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";

import "./App.css";
import AuthProvider from "./store/auth-contex";
import Header from "./components/Layout/Header";
import Auth from "./pages/AuthUser/Auth";
import AuthLogin from "./pages/AuthUser/AuthLogin";
import AuthRegister from "./pages/AuthUser/AuthRegister";
import AuthWelcome from "./pages/AuthUser/AuthWelcome";
import Settings from "./pages/AuthUser/Settings";
import Reader from "./pages/Reader/Reader";

import AddReader from "./pages/Reader/AddReader";
import AddPrize from "./pages/Prize/AddPrize";
import AvailablePrizes from "./pages/Prize/AvailablePrizes";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Box } from "@mui/system";

function App() {
  const authCtx = useContext(AuthProvider);

  //The final Route sends any undefined route to the initial Auth: login/signup page
  return (
    <>
      {authCtx.isLoggedIn && <Header />}
      <main>
        <Switch>
          {/* {!authCtx.isLoggedIn && (
            <Route path={"/register"}>
              <AuthRegister />
            </Route>
          )}

          {!authCtx.isLoggedIn && (
            <Route path={"/login"}>
              <AuthLogin />
            </Route>
          )} */}

          <ProtectedRoute path={"/reader"} exact redirectPath={"/"}>
            <AddReader />
          </ProtectedRoute>

          <ProtectedRoute path={"/reader/:id"} redirectPath={"/"}>
            <Reader />
          </ProtectedRoute>

          <ProtectedRoute path={"/prizes/"} exact redirectPath={"/"}>
            <Box sx={{ marginTop: "75px" }}>
              <AvailablePrizes sx={{ marginTop: "6rem" }} />
            </Box>
          </ProtectedRoute>

          <ProtectedRoute path={"/prize/"} exact redirectPath={"/"}>
            <AddPrize />
          </ProtectedRoute>

          <Route path={"/"}>
            {!authCtx.isLoggedIn ? <Auth /> : <AuthWelcome />}
          </Route>

          <Route path={"*"}>
            <Redirect to="/" />
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

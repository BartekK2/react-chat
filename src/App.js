import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound"
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import RegisterInfo from "./components/RegisterInfo";
import Profile from "./components/Profile";
import { useAuth } from "./firebaseThings/AuthContext"

function App() {
  const { currentUser, isUserInfoAlreadyExists } = useAuth()
  return (
    <>
      <CssBaseline></CssBaseline>
      <Router basename="/react-chat">

        <Switch>
          <PrivateRoute exact info={currentUser} path="/" exact redirectPath="/login" component={Dashboard} />
          {/*XD*/}
          <Route exact path="/signup" component={RegisterForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={RegisterForm} />
          <PrivateRoute exact info={currentUser} path="/profile" redirectPath="/login" component={Profile} />

          <PrivateRoute exact info={isUserInfoAlreadyExists} path="/info" redirectPath="/" component={RegisterInfo} />

          <Route component={NotFound}></Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;

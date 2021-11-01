import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound"
import { AuthProvider } from "./firebaseThings/AuthContext"
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, HashRouter} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <HashRouter basename="/react-chat">
          <ThemeProvider>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" exact component={Dashboard} />
                <PrivateRoute exact path="/react-chat" exact component={Dashboard} />

                <Route exact path="/signup" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/react-chat/login" component={LoginForm} />
                <Route exact path="/react-chat/react-chat/login" component={LoginForm} />
                <Route component={NotFound}></Route>

              </Switch>
            </AuthProvider>
          </ThemeProvider>
        </HashRouter>
    </>
  );
}

export default App;

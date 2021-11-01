import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./firebaseThings/AuthContext"
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./ThemeProvider";
function App() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Router basename="/react-chat">
          <ThemeProvider>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" exact component={Dashboard} />
                <PrivateRoute exact path="/react-chat" exact component={Dashboard} />

                <Route exact path="/signup" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/react-chat/login" component={LoginForm} />
                <Route exact path="/react-chat/react-chat/login" component={LoginForm} />

              </Switch>
            </AuthProvider>
          </ThemeProvider>
        </Router>
    </>
  );
}

export default App;

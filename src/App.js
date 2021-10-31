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
      <Router>
          <ThemeProvider>
            <AuthProvider>
              <Switch>
                <PrivateRoute path="/react-chat" exact component={Dashboard} />
                <Route path="/react-chat/signup" component={RegisterForm} />
                <Route path="/react-chat/login" component={LoginForm} />
                <Route path="/react-chat/dashboard" component={Dashboard} />

              </Switch>
            </AuthProvider>
          </ThemeProvider>
        </Router>
    </>
  );
}

export default App;

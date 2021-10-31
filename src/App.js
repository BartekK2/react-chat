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
                <PrivateRoute path="/" exact component={Dashboard} />
                <Route exact path="/signup" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
              </Switch>
            </AuthProvider>
          </ThemeProvider>
        </Router>
    </>
  );
}

export default App;

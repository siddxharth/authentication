import SignUp from "./SignUp";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
			  <Switch>
				  <PrivateRoute exact path='/dashboard' component={Dashboard}/>
				  <Route exact path='/signup' component={SignUp}/>
				  <Route exact path='/login' component={Login}/>
				  <PrivateRoute component={Dashboard}/>
			  </Switch>
          </Router>
        </div>
      </Container>
  );
}

export default App;

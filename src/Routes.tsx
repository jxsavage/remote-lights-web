import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { reInitAppState } from 'socket';
import MicroControllersPage from './components/MicroControllers/MicroControllersPage';

const Routes: React.FunctionComponent = () => (
  <Router>
    <Navbar>

      <Link className="navbar-brand" to="/">Remote Lights</Link>
      <Nav>
        <Nav.Item>
          <Link
            to="/"
            className="nav-link"
          >
            Class
          </Link>
        </Nav.Item>
        <Button
          onClick={reInitAppState}
        >
          Reset State
        </Button>
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
    <Switch>
      <Route exact path="/">
        <MicroControllersPage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;

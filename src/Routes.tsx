import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { reInitAppState } from 'socket';
import { MicrocontrollersPage, SegmentsPage } from 'components/Pages';

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
            Microcontrollers
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to="/segments"
            className="nav-link"
          >
            Segments
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
        <MicrocontrollersPage />
      </Route>
      <Route exact path="/segments">
        <SegmentsPage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;

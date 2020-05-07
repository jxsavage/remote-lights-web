import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { reInitAppState } from 'socket';
import { MicrocontrollersPage, SegmentsPage } from 'components/pages';
import SegmentGroupsPage from 'components/pages/SegmentGroups';

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
        <Nav.Item>
          <Link
            to="/groups"
            className="nav-link"
          >
            Groups
          </Link>
        </Nav.Item>

      </Nav>
      <Button
        className="ml-auto"
        onClick={reInitAppState}
      >
        Reset State
      </Button>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
    <Switch>
      <Route exact path="/">
        <MicrocontrollersPage />
      </Route>
      <Route exact path="/segments">
        <SegmentsPage />
      </Route>
      <Route exact path="/groups">
        <SegmentGroupsPage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;

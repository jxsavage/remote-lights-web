import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { reInitAppState } from 'socket';
import { MicrocontrollersPage, SegmentsPage, SegmentsGroupPage } from 'components/pages';
import { useDispatch } from 'react-redux';
import { RootStateDispatch } from 'components/RootStateProvider';
import { resetAllMicrosState } from 'Shared/store';

const ReInitAppStateButton: React.FC = () => {
  const dispatch = useDispatch<RootStateDispatch>();
  const reInit = (): void => {
    reInitAppState();
    dispatch(resetAllMicrosState());
  };
  return (
    <Button
      className="ml-auto"
      onClick={reInit}
    >
      Reset State
    </Button>
  );
};
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
      <ReInitAppStateButton />
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
        <SegmentsGroupPage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;

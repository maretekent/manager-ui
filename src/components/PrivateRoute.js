import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, path }) =>
  <Route
    path
    render={props =>
      isAuthenticated
        ? <Component isAuthenticated={isAuthenticated} {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
  />;

export default PrivateRoute;
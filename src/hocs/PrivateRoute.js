import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import { isAuthenticated } from '../services/localStorage';

const PrivateRoute = ({ component: Home, ...rest }) => (
  <Route {...rest} render={props => (
      isAuthenticated() ? (
      <Home {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
  
export default PrivateRoute;
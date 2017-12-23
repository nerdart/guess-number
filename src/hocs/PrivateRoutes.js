import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import Auth from '../services/auth';

const PrivateRoute = ({ component: Home, ...rest }) => (
    
    <Route {...rest} render={props => (
        
        Auth.isAuthenticated ? (
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
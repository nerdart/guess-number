import React from 'react';
import styled from 'styled-components';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div>
      <StyledPageTitle>Login Page</StyledPageTitle>
      <Login />
    </div>
  )
}
 
export default LoginPage;

const StyledPageTitle = styled.h1`
  padding: 2rem;
  max-width: 30em;
`
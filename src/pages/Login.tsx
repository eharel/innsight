import React from 'react';
import styled from 'styled-components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function Login() {
  return (
    <StyledLogin>
      <LoginForm>
        <h1>Login to Innsight</h1>
        <p>Please enter your credentials to access the hotel management system.</p>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="your.email@example.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" />
        </div>
        <button type="submit">Login</button>
      </LoginForm>
    </StyledLogin>
  );
}

export default Login;

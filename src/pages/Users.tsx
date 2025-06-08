import React from 'react';
import styled from 'styled-components';

const StyledUsers = styled.div`
  padding: 2rem;
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin-top: 2rem;
`;

function Users() {
  return (
    <StyledUsers>
      <h1>User Management</h1>
      <p>Create new user accounts for hotel employees here.</p>
      
      <UserForm>
        <h2>Create New User</h2>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="Full Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@example.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role">
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        
        <button type="submit">Create User</button>
      </UserForm>
      
      <div>
        <h2>Existing Users</h2>
        <p>A table of existing users will be displayed here.</p>
      </div>
    </StyledUsers>
  );
}

export default Users;

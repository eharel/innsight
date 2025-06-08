import React from 'react';
import styled from 'styled-components';

const StyledAccount = styled.div`
  padding: 2rem;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin-top: 2rem;
`;

function Account() {
  return (
    <StyledAccount>
      <h1>Account Settings</h1>
      <p>Update your account information here.</p>
      
      <AccountForm>
        <div>
          <h2>Profile Information</h2>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input type="file" id="avatar" accept="image/*" />
          </div>
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your.email@example.com" />
          </div>
        </div>
        
        <div>
          <h2>Change Password</h2>
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" placeholder="••••••••" />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" placeholder="••••••••" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" placeholder="••••••••" />
          </div>
        </div>
        
        <button type="submit">Save Changes</button>
      </AccountForm>
    </StyledAccount>
  );
}

export default Account;

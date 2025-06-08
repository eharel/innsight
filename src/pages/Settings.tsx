import React from 'react';
import styled from 'styled-components';

const StyledSettings = styled.div`
  padding: 2rem;
`;

function Settings() {
  return (
    <StyledSettings>
      <h1>Settings</h1>
      <p>Configure application-wide settings here.</p>
      <div>
        <h2>Hotel Settings</h2>
        <p>Here you'll be able to define:</p>
        <ul>
          <li>Breakfast price</li>
          <li>Minimum and maximum nights per booking</li>
          <li>Maximum guests per booking</li>
          <li>Other hotel-specific settings</li>
        </ul>
      </div>
    </StyledSettings>
  );
}

export default Settings;

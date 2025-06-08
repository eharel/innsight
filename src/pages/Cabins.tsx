import React from 'react';
import styled from 'styled-components';

const StyledCabins = styled.div`
  padding: 2rem;
`;

function Cabins() {
  return (
    <StyledCabins>
      <h1>Cabins</h1>
      <p>Manage all hotel cabins here.</p>
      <div>
        <h2>Cabin Table</h2>
        <p>This will display a table with all cabins, showing the cabin photo, name, capacity, price, and current discount.</p>
        <p>You'll be able to create new cabins, update existing ones, and delete cabins as needed.</p>
      </div>
    </StyledCabins>
  );
}

export default Cabins;

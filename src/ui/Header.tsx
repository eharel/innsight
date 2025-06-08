import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: white;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;
  grid-column: 2;
  grid-row: 1;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: #374151;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 1.6rem;
  font-weight: 600;
`;

function Header() {
  return (
    <StyledHeader>
      <button>
        🌙 Dark Mode
      </button>
      
      <UserInfo>
        <Avatar>JD</Avatar>
        <span>John Doe</span>
      </UserInfo>
    </StyledHeader>
  );
}

export default Header;

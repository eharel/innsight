import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledSidebar = styled.aside`
  background-color: #18212f;
  padding: 3rem 2.4rem;
  border-right: 1px solid #2e3a46;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    height: 9.6rem;
    width: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: #e5e7eb;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  border-radius: 5px;
  text-decoration: none;

  &:hover,
  &:active,
  &.active {
    color: #ffffff;
    background-color: #2e3a46;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #6b7280;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active svg {
    color: #ffffff;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo>
        <h1 style={{ color: 'white', fontSize: '2.4rem' }}>Innsight</h1>
      </Logo>

      <Nav>
        <NavList>
          <li>
            <StyledNavLink to="/dashboard">
              <span>🏠</span> Dashboard
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/bookings">
              <span>📅</span> Bookings
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/cabins">
              <span>🏡</span> Cabins
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">
              <span>👥</span> Users
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings">
              <span>⚙️</span> Settings
            </StyledNavLink>
          </li>
        </NavList>
      </Nav>

      <div style={{ marginTop: 'auto' }}>
        <StyledNavLink to="/account">
          <span>👤</span> Account
        </StyledNavLink>
      </div>
    </StyledSidebar>
  );
}

export default Sidebar;

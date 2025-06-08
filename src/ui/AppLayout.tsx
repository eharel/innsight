import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: #f5f5f5;
  padding: 0;
  overflow: auto;
  grid-column: 2;
  grid-row: 2;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

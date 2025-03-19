import { Outlet } from 'react-router';
import styled from 'styled-components';

import { useAuth } from '../../hooks';
import { Button } from '../button';

export const Layout = () => {
  const { handleLogout, username } = useAuth();

  return (
    <Container>
      <TopBar>
        <p>
          Hello, <span>{username}!</span>
        </p>
        <ButtonWrapper>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </ButtonWrapper>
      </TopBar>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  margin: 25px;
  display: flex;
  justify-content: end;
  align-items: center;

  p {
    font-weight: 600;
    span {
      color: var(--purple);
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100px;
  margin-left: 10px;
`;

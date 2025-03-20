import LoginForm from './form';
import { Navigate } from 'react-router';
import styled from 'styled-components';

import { useAuth } from '../../hooks';
import { sizes } from '../../styles/break-points';

function Login() {
  const { handleLogin, isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/servers" />;

  return (
    <Layout>
      <FormContainer>
        <Title>Nord homework</Title>
        <LoginForm handleOnSubmit={handleLogin} />
      </FormContainer>
    </Layout>
  );
}

const Title = styled.h1`
  margin-bottom: 25px;
  text-align: center;
`;

const FormContainer = styled.div`
  padding: 30px;
  border-radius: 12px;
  width: 280px;
  background-color: white;

  @media ${sizes.sm} {
    width: 350px;
  }

  box-shadow: var(--shadow-elevation-medium);
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  padding: 0;
  margin: 0;
`;

export default Login;

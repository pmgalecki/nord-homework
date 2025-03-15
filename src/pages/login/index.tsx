import LoginForm from './form';
import { Navigate } from 'react-router';
import { useAuth } from '../../hooks';

function Login() {
  const { handleLogin, loginError, isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/servers" />;

  return (
    <div>
      <LoginForm handleOnSubmit={handleLogin} />
      {loginError && (
        <span style={{ color: 'tomato', fontSize: 22 }}>{loginError}</span>
      )}
    </div>
  );
}

export default Login;

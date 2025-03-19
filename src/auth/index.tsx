import { createContext, useState, ReactNode } from 'react';
import { getToken } from '../data/get-token';
import { useNavigate } from 'react-router';
import { LoginValues } from '../pages/login/form';
import { LOGIN_PATH, SERVERS_PATH } from '../constants';

const AuthContext = createContext<{
  handleLogin: ({ username, password }: LoginValues) => Promise<void>;
  handleLogout: () => void;
  loginError: string | null;
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
}>({
  handleLogin: async () => {},
  handleLogout: () => {},
  loginError: null,
  isAuthenticated: false,
  token: null,
  username: '',
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  );
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: LoginValues) => {
    const { token, error } = await getToken(username, password);

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setToken(localStorage.getItem('token'));
      setUsername(localStorage.getItem('username'));
      navigate(SERVERS_PATH);
    }
    if (error) setLoginError(error);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate(LOGIN_PATH);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        loginError,
        isAuthenticated,
        token,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

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
}>({
  handleLogin: async () => {},
  handleLogout: () => {},
  loginError: null,
  isAuthenticated: false,
  token: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  );
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: LoginValues) => {
    const { token, error } = await getToken(username, password);

    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setToken(localStorage.getItem('token'));
      navigate(SERVERS_PATH);
    }
    if (error) setLoginError(error);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(LOGIN_PATH);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, loginError, isAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

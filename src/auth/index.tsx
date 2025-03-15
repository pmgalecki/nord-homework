import { createContext, useState, ReactNode } from 'react';
import { getToken } from '../data/get-token';
import { useNavigate } from 'react-router';
import { LoginValues } from '../pages/login/form';

const AuthContext = createContext<{
  handleLogin: ({ username, password }: LoginValues) => Promise<void>;
  handleLogout: () => void;
  loginError: string | null;
  isAuthenticated: boolean;
}>({
  handleLogin: async () => {},
  handleLogout: () => {},
  loginError: null,
  isAuthenticated: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  );
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: LoginValues) => {
    const { token, error } = await getToken(username, password);

    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/servers');
    }
    if (error) setLoginError(error);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, loginError, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

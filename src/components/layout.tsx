import { Outlet } from 'react-router';
import { useAuth } from '../hooks';

export const Layout = () => {
  const { handleLogout } = useAuth();

  return (
    <>
      <button onClick={() => handleLogout()}>Logout</button>
      <Outlet />
    </>
  );
};

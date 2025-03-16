import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Servers from './pages/servers';
import Login from './pages/login';
import { AuthProvider } from './auth';
import { Layout, PrivateRoute } from './components';
import { LOGIN_PATH, SERVERS_PATH } from './constants';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path={LOGIN_PATH} element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path={SERVERS_PATH}
                element={
                  <PrivateRoute>
                    <Servers />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Servers from './pages/servers';
import Login from './pages/login';
import { AuthProvider } from './auth';
import { Layout, PrivateRoute } from './components';
import { LOGIN_PATH, SERVERS_PATH } from './constants';

const queryClient = new QueryClient();

function App() {
  return (
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
              <Route path="*" element={<Login />} />
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    font-family:  Inter, Avenir, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: var(--beige);
  }

  :root {
    --purple: #985a93;
    --blue-grey: #99aebb;
    --light-blue-grey: #b6c4ce;
    --grey: #a7a7a7;
    --blue: #7dc4e8;
    --beige: #e1e1e1;

    --shadow-color: 0deg 0% 55%;
    --shadow-elevation-low:
      0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
      0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
      1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
    --shadow-elevation-medium:
      0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
      0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
      2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
      5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
`;

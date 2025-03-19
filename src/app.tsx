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
              <Route path="*" element={<h1>Not Found</h1>} />
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
    background-color: var(--blue);
  }

  :root {
    --purple: #985a93;
    --blue-grey: #99aebb;
    --light-blue-grey: #b6c4ce;
    --grey: #a7a7a7;
    --blue: #7dc4e8;

    --shadow-color: 201deg 49% 39%;
    --shadow-elevation-low:
      0.4px 0.7px 0.9px hsl(var(--shadow-color) / 0.39),
      0.7px 1.3px 1.7px -1.2px hsl(var(--shadow-color) / 0.39),
      1.8px 3.2px 4.1px -2.5px hsl(var(--shadow-color) / 0.39);
    --shadow-elevation-medium:
      0.4px 0.7px 0.9px hsl(var(--shadow-color) / 0.41),
      1.5px 2.5px 3.3px -0.8px hsl(var(--shadow-color) / 0.41),
      3.8px 6.4px 8.4px -1.7px hsl(var(--shadow-color) / 0.41),
      9.2px 15.8px 20.6px -2.5px hsl(var(--shadow-color) / 0.41);
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

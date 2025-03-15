import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Servers from './pages/servers';
import Login from './pages/login';

import { BrowserRouter, Routes, Route } from 'react-router';

import { createGlobalStyle } from 'styled-components';

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
      <Routes>
        <Route path="/servers" element={<Servers />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

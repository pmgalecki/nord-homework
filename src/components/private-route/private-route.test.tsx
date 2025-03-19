import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { PrivateRoute } from './index';

let useAuthMock = {
  isAuthenticated: true,
};
vi.mock('../../hooks', () => ({
  useAuth: () => useAuthMock,
}));

describe('PrivateRoute', () => {
  it('should render children if is authenticated', () => {
    render(
      <BrowserRouter>
        <PrivateRoute>
          <h1>Hello</h1>
        </PrivateRoute>
      </BrowserRouter>,
    );

    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('should not render children if is not authenticated', () => {
    useAuthMock = {
      isAuthenticated: false,
    };

    render(
      <BrowserRouter>
        <PrivateRoute>
          <h1>Hello</h1>
        </PrivateRoute>
      </BrowserRouter>,
    );

    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
  });
});

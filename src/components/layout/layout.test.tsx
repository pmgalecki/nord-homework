import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Layout } from './index';

const mockLogout = vi.fn();
vi.mock('../../hooks', () => ({
  useAuth: () => ({
    username: 'Jerry Seinfeld',
    handleLogout: mockLogout,
  }),
}));

describe('Layout', () => {
  it('renders username and button', () => {
    render(<Layout />);

    expect(screen.getByText(/jerry seinfeld/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('fires handleLogout function when button is clicked', async () => {
    render(<Layout />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});

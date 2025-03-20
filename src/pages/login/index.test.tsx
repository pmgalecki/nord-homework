import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './index';

describe('Login page', () => {
  it('should render page', () => {
    render(<Login />);

    expect(screen.getByText(/nord homework/i)).toBeInTheDocument();
  });
});

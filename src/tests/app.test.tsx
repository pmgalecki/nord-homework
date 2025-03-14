import { render, screen } from '@testing-library/react';
import App from '../app';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);

    expect(screen.getByText(/hi mom/i)).toBeInTheDocument();
  });
});

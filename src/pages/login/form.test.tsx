import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './form';

describe('LoginForm', () => {
  it('should render form fields and submit button', () => {
    const handleOnSubmitMock = vi.fn();

    render(<LoginForm handleOnSubmit={handleOnSubmitMock} />);

    const usernameInput = screen.getByPlaceholderText(/enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should call handleOnSubmit when submit button is clicked and fields are valid', async () => {
    const handleOnSubmitMock = vi.fn();

    render(<LoginForm handleOnSubmit={handleOnSubmitMock} />);

    const usernameInput = screen.getByPlaceholderText(/enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(handleOnSubmitMock).toHaveBeenCalled());
  });

  it('should display error message when fields are invalid', async () => {
    const handleOnSubmitMock = vi.fn();

    render(<LoginForm handleOnSubmit={handleOnSubmitMock} />);

    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);

    await waitFor(() => expect(handleOnSubmitMock).not.toHaveBeenCalled());

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});

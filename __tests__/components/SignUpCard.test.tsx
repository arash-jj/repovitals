import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpCard from '@/components/SignUpCard';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('@/lib/auth/auth-client', () => ({
  signUp: {
    email: jest.fn(),
  },
}));

import { signUp } from '@/lib/auth/auth-client';
const mockSignUpEmail = signUp.email as jest.Mock;

describe('SignUpCard', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders all form fields', () => {
    render(<SignUpCard />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation error when name is too short', async () => {
    render(<SignUpCard />);
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'J');
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<SignUpCard />);
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid');
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when password is too short', async () => {
    render(<SignUpCard />);
    const passwordInput = screen.getByTestId('password-input');
    await user.type(passwordInput, '123');
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when passwords do not match', async () => {
    render(<SignUpCard />);
    const passwordInput = screen.getByTestId('password-input');
    const confirmInput = screen.getByTestId('confirm-password-input');
    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'different');
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('calls API and redirects on success', async () => {
    mockSignUpEmail.mockResolvedValue({ error: null });
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
    });
    render(<SignUpCard />);
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.type(screen.getByTestId('confirm-password-input'), 'password123');
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);
    expect(mockSignUpEmail).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('disables button and shows loading text while submitting', async () => {
    mockSignUpEmail.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<SignUpCard />);
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.type(screen.getByTestId('confirm-password-input'), 'password123');
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/creating account/i);
  });
});
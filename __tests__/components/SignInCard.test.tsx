import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SignInCard from "@/components/SignInCard"

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock("@/lib/auth/auth-client", () => ({
  signIn: {
    email: jest.fn(),
  },
}))

import { signIn } from "@/lib/auth/auth-client"
const mockSignInEmail = signIn.email as jest.Mock

describe("SignInCard", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders email and password fields", () => {
    render(<SignInCard />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByTestId("signin-password-input")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("shows validation error for invalid email", async () => {
    render(<SignInCard />)
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, "invalid")
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  it("shows validation error for short password", async () => {
    render(<SignInCard />)
    const passwordInput = screen.getByTestId("signin-password-input")
    await user.type(passwordInput, "123")
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it("calls API and redirects on success", async () => {
    mockSignInEmail.mockResolvedValue({ error: null })
    const mockPush = jest.fn()
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    })
    render(<SignInCard />)
    await user.type(screen.getByLabelText(/email/i), "john@example.com")
    await user.type(screen.getByTestId("signin-password-input"), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))
    expect(mockSignInEmail).toHaveBeenCalledWith({
      email: "john@example.com",
      password: "password123",
    })
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
  })

  it("displays server error for wrong credentials", async () => {
    mockSignInEmail.mockResolvedValue({ error: { message: "Invalid email or password" } })
    render(<SignInCard />)
    await user.type(screen.getByLabelText(/email/i), "john@example.com")
    await user.type(screen.getByTestId("signin-password-input"), "wrong")
    await user.click(screen.getByRole("button", { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })
  })
})

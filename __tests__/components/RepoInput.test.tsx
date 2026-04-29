import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RepoInput from "@/components/RepoInput"

const mockOnAnalyze = jest.fn()

describe("RepoInput", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders input and button", () => {
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    expect(screen.getByPlaceholderText(/github\.com/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Check Repository Health/i })).toBeInTheDocument()
  })

  it("validates GitHub URL format", async () => {
    const user = userEvent.setup()
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={false} />)

    const input = screen.getByPlaceholderText(/github\.com/i)
    await user.type(input, "invalid-input")
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/Enter a GitHub repo/i)).toBeInTheDocument()
    })
  })

  it("accepts valid owner/repo format", async () => {
    const user = userEvent.setup()
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={false} />)

    const input = screen.getByPlaceholderText(/github\.com/i)
    await user.type(input, "facebook/react")

    await waitFor(() => {
      expect(screen.getByText(/Valid GitHub repository/i)).toBeInTheDocument()
    })
  })

  it("accepts full GitHub URL format", async () => {
    const user = userEvent.setup()
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={false} />)

    const input = screen.getByPlaceholderText(/github\.com/i)
    await user.type(input, "https://github.com/vercel/next.js")

    await waitFor(() => {
      expect(screen.getByText(/Valid GitHub repository/i)).toBeInTheDocument()
    })
  })

  it("calls onAnalyze with owner and repo on submit", async () => {
    const user = userEvent.setup()
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={false} />)

    const input = screen.getByPlaceholderText(/github\.com/i)
    await user.type(input, "facebook/react")

    const button = screen.getByRole("button", { name: /Check Repository Health/i })
    await user.click(button)

    expect(mockOnAnalyze).toHaveBeenCalledWith("facebook", "react")
  })

  it("disables button while loading", () => {
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={true} />)
    const button = screen.getByRole("button", { name: /Analyzing/i })
    expect(button).toBeDisabled()
  })

  it("shows loading text when isLoading is true", () => {
    render(<RepoInput onAnalyze={mockOnAnalyze} isLoading={true} />)
    expect(screen.getByText(/Analyzing/i)).toBeInTheDocument()
  })
})

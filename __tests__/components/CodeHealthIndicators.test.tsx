import { render, screen } from "@testing-library/react"
import { CodeHealthIndicators } from "@/components/CodeHealthIndicators"

const mockCodeHealthData = {
  hasLicense: true,
  licenseType: "MIT License",
  isOsiApproved: true,
  topics: ["javascript", "react", "frontend", "ui"],
  hasDescription: true,
  hasReadme: true,
  score: 65,
}

describe("CodeHealthIndicators", () => {
  it("renders the component with score", () => {
    render(<CodeHealthIndicators data={mockCodeHealthData} />)
    expect(screen.getByText("65/100")).toBeInTheDocument()
    expect(screen.getByText(/Code Health Indicators/i)).toBeInTheDocument()
  })

  it("displays license information", () => {
    render(<CodeHealthIndicators data={mockCodeHealthData} />)
    expect(screen.getByText("MIT License")).toBeInTheDocument()
    expect(screen.getByText(/OSI Approved/i)).toBeInTheDocument()
  })

  it("displays all topics", () => {
    render(<CodeHealthIndicators data={mockCodeHealthData} />)
    expect(screen.getByText("javascript")).toBeInTheDocument()
    expect(screen.getByText("react")).toBeInTheDocument()
    expect(screen.getByText("frontend")).toBeInTheDocument()
    expect(screen.getByText("ui")).toBeInTheDocument()
  })

  it("shows warning when no license", () => {
    const noLicenseData = { ...mockCodeHealthData, hasLicense: false, licenseType: null }
    render(<CodeHealthIndicators data={noLicenseData} />)
    expect(screen.getByText(/No license found/i)).toBeInTheDocument()
  })

  it("shows message when no topics", () => {
    const noTopicsData = { ...mockCodeHealthData, topics: [] }
    render(<CodeHealthIndicators data={noTopicsData} />)
    expect(screen.getByText(/No topics added/i)).toBeInTheDocument()
  })
})
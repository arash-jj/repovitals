import { render, screen } from "@testing-library/react"
import { CommunityEngagement } from "@/components/CommunityEngagement"

const mockCommunityData = {
  stars: { value: 220000, trend: 12 },
  forks: { value: 45000, trend: 8 },
  contributors: { value: 1523, trend: 45 },
  score: 92,
}

describe("CommunityEngagement", () => {
  it("renders the component with score", () => {
    render(<CommunityEngagement data={mockCommunityData} />)
    expect(screen.getByText("92/100")).toBeInTheDocument()
    expect(screen.getByText(/Community Engagement/i)).toBeInTheDocument()
  })

  it("displays star count with trend", () => {
    render(<CommunityEngagement data={mockCommunityData} />)
    expect(screen.getByText("220,000")).toBeInTheDocument()
    expect(screen.getByText(/▲ 12% this month/i)).toBeInTheDocument()
  })

  it("displays fork count with trend", () => {
    render(<CommunityEngagement data={mockCommunityData} />)
    expect(screen.getByText("45,000")).toBeInTheDocument()
    expect(screen.getByText(/▲ 8% this month/i)).toBeInTheDocument()
  })

  it("displays contributor count", () => {
    render(<CommunityEngagement data={mockCommunityData} />)
    expect(screen.getByText("1,523")).toBeInTheDocument()
  })
})
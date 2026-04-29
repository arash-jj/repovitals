import { render, screen } from "@testing-library/react"
import { ProjectVitality } from "@/components/ProjectVitality"

const mockVitalityData = {
  recentActivity: {
    value: "2 days ago",
    status: "good",
    message: "Last commit 2 days ago - Active",
  },
  commitFrequency: {
    value: 45,
    status: "good",
    message: "Regular commits",
  },
  issueVelocity: {
    value: 3.2,
    status: "good",
    message: "Issues addressed promptly",
  },
  prVelocity: {
    value: 2.1,
    status: "good",
    message: "PRs merged quickly",
  },
  score: 85,
}

describe("ProjectVitality", () => {
  it("renders the component with score", () => {
    render(<ProjectVitality data={mockVitalityData} />)
    expect(screen.getByText("85")).toBeInTheDocument()
    expect(screen.getByText(/Project Vitality/i)).toBeInTheDocument()
  })

  it("displays all metric cards", () => {
    render(<ProjectVitality data={mockVitalityData} />)
    expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument()
    expect(screen.getByText(/Commit Frequency/i)).toBeInTheDocument()
    expect(screen.getByText(/Issue Velocity/i)).toBeInTheDocument()
    expect(screen.getByText(/PR Velocity/i)).toBeInTheDocument()
  })

  it("shows correct values for each metric", () => {
    render(<ProjectVitality data={mockVitalityData} />)
    expect(screen.getByText("2 days ago")).toBeInTheDocument()
    expect(screen.getByText("45/week")).toBeInTheDocument()
  })
})
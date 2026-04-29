import { render, screen } from "@testing-library/react"
import HealthDonutChart from "@/components/HealthDonutChart"

describe("HealthDonutChart", () => {
  it("renders the chart with score", () => {
    render(<HealthDonutChart score={78} size={180} />)
    expect(screen.getByText("78")).toBeInTheDocument()
    expect(screen.getByText(/Health Score/i)).toBeInTheDocument()
  })

  it("renders with default size when not provided", () => {
    render(<HealthDonutChart score={85} />)
    expect(screen.getByText("85")).toBeInTheDocument()
  })

  it("handles score of 0", () => {
    render(<HealthDonutChart score={0} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("handles score of 100", () => {
    render(<HealthDonutChart score={100} />)
    expect(screen.getByText("100")).toBeInTheDocument()
  })
})
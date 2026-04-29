describe("Repo Analysis Flow", () => {
  beforeEach(() => {
    cy.visit("/dashboard")
  })

  it("should display repo input form", () => {
    cy.get('input[placeholder*="github.com"]').should("be.visible")
    cy.get('button').contains(/Check Repository Health/i).should("be.visible")
  })

  it("should analyze valid repository", () => {
    cy.get('input[placeholder*="github.com"]').type("facebook/react")
    cy.get('button').contains(/Check Repository Health/i).click()
    
    cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should("be.visible")
    cy.contains("facebook/react", { timeout: 30000 }).should("be.visible")
  })

  it("should show error for invalid repository", () => {
    cy.get('input[placeholder*="github.com"]').type("invalid/repo")
    cy.get('button').contains(/Check Repository Health/i).click()
    
    cy.contains(/not found/i, { timeout: 10000 }).should("be.visible")
  })
})
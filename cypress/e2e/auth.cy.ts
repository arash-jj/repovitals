// it wont pass because when the won't be able to visit /sign-in/up routes this action is just for deme (visit proxy.ts file in root)

describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/sign-in")
  })

  it("should display sign in form", () => {
    cy.get('input[name="email"]').should("be.visible")
    cy.get('input[name="password"]').should("be.visible")
    cy.get('button[type="submit"]').should("be.visible")
  })

  it("should show validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click()
    cy.contains(/invalid email/i).should("be.visible")
  })

  it("should navigate to sign up page", () => {
    cy.contains(/sign up/i).click()
    cy.url().should("include", "/sign-up")
    cy.get('input[name="name"]').should("be.visible")
  })
})

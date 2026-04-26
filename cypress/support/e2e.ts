import './commands'

// Clean up before each test
beforeEach(() => {
  // Clear cookies and local storage
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
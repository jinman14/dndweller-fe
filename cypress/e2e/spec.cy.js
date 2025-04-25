describe('Landing Page', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:5173/');
    cy.contains("The Dungeon's Newest Dweller")
  })
})
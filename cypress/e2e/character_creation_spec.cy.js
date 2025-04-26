describe('character creation', () => {
  it('can create a character', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('a', 'Create Your Dungeon Dweller').click();
    cy.contains("Choose A Class:");
    cy.contains("Choose A Race:");
    cy.contains('Bard').click();
    cy.contains('Tiefling').click();
    cy.contains('a', "Fill Out Your Dweller's Details").click();
    cy.get('.token-grid').children().should('have.length.greaterThan', 0);
    cy.get('.token-card').contains('Tiefling').click();
    cy.contains('button', 'Confirm').click();
    cy.url().should('include', '/form');
  })
})
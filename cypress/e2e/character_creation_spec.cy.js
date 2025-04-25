describe('character creation', () => {
  it('can access the race class selection screen', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('a', 'Create Your Dungeon Dweller').click();
    cy.contains("Choose A Class:");
    cy.contains("Choose A Race:");
    cy.contains('Bard').click();
    cy.contains('Tiefling').click();
    cy.contains('a', "Fill Out Your Dweller's Details").click();

  })
})
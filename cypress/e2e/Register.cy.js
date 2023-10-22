describe('Register Component', () => {
  it('should register a user', () => {
    cy.visit('http://localhost:9000/#/Register');
    cy.get('input[aria-label="Nome completo"]').should('be.visible').type('Alisson Patrick');
    cy.get('input[aria-label="Documento"]').type('124.456.789-99');
    cy.get('input[aria-label="Senha"]').type('password123');
    cy.get('input[aria-label="Data de nascimento"]').type('1990-01-01');
    cy.get('button.q-btn.bg-primary').should('be.visible').click();
    cy.url().should('include', '/Items');
  });
});

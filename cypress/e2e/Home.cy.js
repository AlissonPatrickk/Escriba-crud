describe('Login Component', () => {
  it('should log in a user', () => {
    cy.visit('http://localhost:9000/#/');
    cy.get('input[aria-label="Documento"]').type('124.456.789-99');
    cy.get('input[aria-label="Senha"]').type('password123');
    cy.get('button.q-btn.bg-primary').click();
  });
});

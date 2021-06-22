describe('App E2E', () => {
  it('헤더가 있어야 한다', () => {
    cy.visit('/');

    cy.get('h1').should('have.text', 'My Counter');
  });
});

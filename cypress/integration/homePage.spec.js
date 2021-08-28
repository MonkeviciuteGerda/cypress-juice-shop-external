describe('Home Page tests', () => {
    it('should be able to visit home page', () => {
        cy.visit('/#');
        cy.url().should('include', '/#');
        cy.contains('OWASP Juice Shop');
    });

    it('should be able to visit home page as logged in user', () => {
        cy.visit('/#');
        cy.get('[aria-label="Close Welcome Banner"]').click();
        cy.get('[aria-label="dismiss cookie message"]').click();

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="email-input"]').type('jane.doe@test.com');
        cy.get('[data-cy="password-input"]').type('jane.doe');
        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="user-email"] span').should('contain.text', 'jane.doe@test.com');
    });
});

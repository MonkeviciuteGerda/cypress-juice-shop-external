const addressName = `Cypress random address name ${Math.floor(Math.random() * 100000000)}`;

describe('Address Page tests', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/#/address/saved');
    });

    it('should be able to create new address', () => {
        cy.get('[data-cy="add-new-address-button"]').click();

        cy.get('[data-cy="country-input"]').type('Country');
        cy.get('[data-cy="name-input"]').type(addressName);
        cy.get('[data-cy="mobile-number-input"]').type('1234567890');
        cy.get('[data-cy="zip-code-input"]').type('12345');
        cy.get('[data-cy="address-textarea"]').type('Address');
        cy.get('[data-cy="city-input"]').type('City');
        cy.get('[data-cy="state-input"]').type('State');
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="addresses-table"] mat-row')
            .last()
            .within(() => {
                cy.get('[data-cy="full-name"]').should('contain.text', addressName);
                cy.get('[data-cy="address"]').should('contain.text', 'Address, City, State, 12345');
                cy.get('[data-cy="country"]').should('contain.text', 'Country');
                cy.get('[data-cy="edit-button"]').should('be.visible');
                cy.get('[data-cy="delete-button"]').should('be.visible');
            });
    });
});

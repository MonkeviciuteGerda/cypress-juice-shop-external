import ApiRequests from '../utils/apiRequests.utils';

const apiRequests = new ApiRequests();

const addressName = `Cypress random address name ${Math.floor(Math.random() * 100000000)}`;

describe('Address Page tests', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/#/address/saved');
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        Cypress.Cookies.preserveOnce('token', 'cookieconsent_status', 'welcomebanner_status');
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

    it('should be able to edit existing address', () => {
        const addressDetails = {
            country: 'Country',
            fullName: addressName,
            mobileNum: 1234567890,
            zipCode: '12345',
            streetAddress: 'Address',
            city: 'City',
            state: 'State',
        };

        apiRequests.createAddress(addressDetails);

        cy.reload();
        cy.get('[data-cy="addresses-table"] mat-row')
            .last()
            .within(() => {
                cy.get('[data-cy="full-name"]').should('contain.text', addressName);
                cy.get('[data-cy="address"]').should('contain.text', 'Address, City, State, 12345');
                cy.get('[data-cy="country"]').should('contain.text', 'Country');
                cy.get('[data-cy="edit-button"]').should('be.visible');
                cy.get('[data-cy="delete-button"]').should('be.visible');
            });

        cy.get('[data-cy="addresses-table"] mat-row')
            .last()
            .within(() => {
                cy.get('[data-cy="edit-button"]').click();
            });

        cy.get('[data-cy="country-input"]').clear().type('Country2');
        cy.get('[data-cy="name-input"]').clear().type(`2${addressName}`);
        cy.get('[data-cy="mobile-number-input"]').clear().type('2234567890');
        cy.get('[data-cy="zip-code-input"]').clear().type('22345');
        cy.get('[data-cy="address-textarea"]').clear().type('Address2');
        cy.get('[data-cy="city-input"]').clear().type('City2');
        cy.get('[data-cy="state-input"]').clear().type('State2');
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="addresses-table"] mat-row')
            .last()
            .within(() => {
                cy.get('[data-cy="full-name"]').should('contain.text', `2${addressName}`);
                cy.get('[data-cy="address"]').should('contain.text', 'Address2, City2, State2, 22345');
                cy.get('[data-cy="country"]').should('contain.text', 'Country2');
                cy.get('[data-cy="edit-button"]').should('be.visible');
                cy.get('[data-cy="delete-button"]').should('be.visible');
            });
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });
});

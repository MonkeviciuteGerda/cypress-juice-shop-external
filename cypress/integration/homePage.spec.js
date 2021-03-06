import HomePage from '../page-objects/homePage/homePage';
import UseFixture from '../utils/useFixture.utils';

const useFixture = new UseFixture();

describe('Home Page tests', () => {
    it(['regression'], 'should be able to visit home page', () => {
        cy.visit('/#');
        cy.url().should('include', '/#');
        cy.contains('OWASP Juice Shop');
    });

    it(['smoke', 'regression'], 'should be able to visit home page as logged in user', () => {
        cy.visit('/#');
        cy.get('[aria-label="Close Welcome Banner"]').click();
        cy.get('[aria-label="dismiss cookie message"]').click();

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="email-input"]').type(Cypress.env('email'));
        cy.get('[data-cy="password-input"]').type(Cypress.env('password'));
        cy.get('[data-cy="login-button"]').click();

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="user-email"] span').should('contain.text', Cypress.env('email'));
    });

    it(['regression'], 'should be able to login without UI', () => {
        const body = {
            email: Cypress.env('email'),
            password: Cypress.env('password'),
        };

        cy.request({
            method: 'POST',
            url: '/rest/user/login',
            body,
        }).then((response) => {
            const token = response.body.authentication.token;
            cy.setCookie('token', token);
            window.localStorage.setItem('token', token);
        });

        cy.visit('/#');
        cy.get('[aria-label="Close Welcome Banner"]').click();
        cy.get('[aria-label="dismiss cookie message"]').click();

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="user-email"] span').should('contain.text', Cypress.env('email'));
    });

    it('should be able to login without UI with custom command', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/#');

        cy.get('[data-cy="account-button"]').click();
        cy.get('[data-cy="user-email"] span').should('contain.text', Cypress.env('email'));
    });

    it('should be able to display products in home page', () => {
        HomePage.openHomePage();
        HomePage.closeBanners();

        HomePage.assertNProductsAreDisplayed(12);
    });

    it('should be able to see sold out item', () => {
        useFixture.soldOutItem();
        HomePage.openHomePage();
        cy.wait('@soldOut');
        HomePage.closeBanners();

        HomePage.assertNthProductIsSoldOut(1);
    });

    it('should be able to add pruducts to basket if they are in stock', { retries: 2 }, () => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        useFixture.soldOutItem();
        HomePage.openHomePage();
        cy.wait('@soldOut');

        HomePage.addProductsToBasketWithRibbonsInStock();
        HomePage.assertTotalBasketItemsCount(3);
    });
});

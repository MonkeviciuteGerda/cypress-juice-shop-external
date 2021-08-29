import WaitForRequests from '../../utils/waitForRequests.utils';

const waitForRequests = new WaitForRequests();

class HomePage {
    getCloseWelcomeBannerButton() {
        return cy.get('[aria-label="Close Welcome Banner"]');
    }

    getDismissCookieButton() {
        return cy.get('[aria-label="dismiss cookie message"]');
    }

    getProductCard() {
        return cy.get('[data-cy="item-card"]');
    }

    openHomePage() {
        waitForRequests.waitForQuantities();
        waitForRequests.waitForProducts();
        cy.visit('/');
        cy.wait('@quantities');
        cy.wait('@products');
    }

    closeBanners() {
        this.getCloseWelcomeBannerButton().click();
        this.getDismissCookieButton().click();
    }

    assertNProductsAreDisplayed(n) {
        this.getProductCard().should('have.length', n);
        this.getProductCard().first().should('be.visible');
    }
}

export default new HomePage();

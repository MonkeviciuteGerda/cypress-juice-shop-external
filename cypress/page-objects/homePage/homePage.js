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
        cy.intercept('/api/Quantitys/').as('quantities');
        cy.intercept('/rest/products/search?q=').as('products');
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

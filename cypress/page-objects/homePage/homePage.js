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

    getSoldOutRibbon() {
        return cy.get('[data-cy="sold-out-ribbon"]');
    }

    getProductWithRibbon() {
        return cy.get('[data-cy="item-card"] .ribbon');
    }

    getAddToBasketButton() {
        return cy.get('[data-cy="add-to-basket-button"]');
    }

    getTotalBasketItemsCount() {
        return cy.get('[data-cy="item-total"]');
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

    assertNthProductIsSoldOut(nth) {
        this.getProductCard()
            .eq(nth)
            .within(() => {
                this.getSoldOutRibbon().should('be.visible');
            });
    }

    addProductsToBasketWithRibbonsInStock() {
        this.getProductWithRibbon().each(($li, index) => {
            if ($li.text() !== 'Sold Out') {
                this.getProductWithRibbon()
                    .eq(index)
                    .parent()
                    .within(() => {
                        this.getAddToBasketButton().click();
                    });
            }
        });
    }

    assertTotalBasketItemsCount(count) {
        this.getTotalBasketItemsCount().should('have.text', count);
    }
}

export default new HomePage();

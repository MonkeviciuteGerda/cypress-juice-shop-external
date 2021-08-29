export default class WaitForRequests {
    waitForQuantities() {
        cy.intercept('/api/Quantitys/').as('quantities');
    }

    waitForProducts() {
        cy.intercept('/rest/products/search?q=').as('products');
    }
}

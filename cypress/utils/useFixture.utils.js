export default class UseFixture {
    soldOutItem() {
        cy.intercept('/api/Quantitys/', { fixture: 'soldOutItem' }).as('soldOut');
    }
}

import ApiRequests from '../../../utils/apiRequests.utils';

const apiRequests = new ApiRequests();

let token;
let bid;

describe('POST Basket API Tests', () => {
    before(() => {
        apiRequests.getToken(Cypress.env('email'), Cypress.env('password')).then((response) => {
            token = response.token;
            bid = response.bid;

            apiRequests.deleteProductsFromBasket(token, bid);
        });
    });

    it('should be able to add product to basket', () => {
        const body = {
            ProductId: 1,
            BasketId: bid,
            quantity: 1,
        };

        cy.request({
            method: 'POST',
            url: '/api/BasketItems/',
            headers: { Authorization: `Bearer ${token}` },
            body,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys('data', 'status');
            expect(response.body.data).to.have.all.keys(
                'BasketId',
                'ProductId',
                'createdAt',
                'id',
                'quantity',
                'updatedAt',
            );
            expect(response.body.data.BasketId).to.eq(body.BasketId);
            expect(response.body.data.ProductId).to.eq(body.ProductId);
            expect(response.body.data.quantity).to.eq(body.quantity);
        });
    });

    it('should not be able to add the same product to basket', () => {
        const body = {
            ProductId: 2,
            BasketId: bid,
            quantity: 1,
        };

        cy.request({
            method: 'POST',
            url: '/api/BasketItems/',
            headers: { Authorization: `Bearer ${token}` },
            body,
        }).then(() => {
            cy.request({
                method: 'POST',
                url: '/api/BasketItems/',
                headers: { Authorization: `Bearer ${token}` },
                body,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(500);
            });
        });
    });

    it('should not be able to add product to basket if not authenticated', () => {
        const body = {
            ProductId: 1,
            BasketId: bid,
            quantity: 1,
        };

        cy.request({
            method: 'POST',
            url: '/api/BasketItems/',
            headers: { Authorization: null },
            body,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.contain('UnauthorizedError: Format is Authorization: Bearer [token]');
        });
    });

    it("should not be able to add product to another user's basket", () => {
        const body = {
            ProductId: 1,
            BasketId: bid + 1,
            quantity: 1,
        };

        cy.request({
            method: 'POST',
            url: '/api/BasketItems/',
            headers: { Authorization: `Bearer ${token}` },
            body,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.contain('Invalid BasketId');
        });
    });
});

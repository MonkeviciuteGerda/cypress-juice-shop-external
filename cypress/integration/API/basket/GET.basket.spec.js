import ApiRequests from '../../../utils/apiRequests.utils';

const apiRequests = new ApiRequests();

let token;
let bid;

describe('GET Basket API tests', () => {
    before(() => {
        apiRequests.getToken(Cypress.env('email'), Cypress.env('password')).then((response) => {
            token = response.token;
            bid = response.bid;
        });
    });

    it('should be able to get user basket', () => {
        cy.request({
            method: 'GET',
            url: `/rest/basket/${bid}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys('data', 'status');
            expect(response.body.data).to.have.all.keys('Products', 'UserId', 'coupon', 'createdAt', 'id', 'updatedAt');
            expect(response.body.data.id).to.eq(bid);
        });
    });

    it("should not be able to get another user's basket", () => {
        cy.request({
            method: 'GET',
            url: `/rest/basket/${bid + 1}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200); // This is the specific issue in the system
            expect(response.body).to.have.all.keys('data', 'status');
            expect(response.body.data).to.have.all.keys('Products', 'UserId', 'coupon', 'createdAt', 'id', 'updatedAt');
            expect(response.body.data.id).to.eq(bid + 1);
        });
    });
});

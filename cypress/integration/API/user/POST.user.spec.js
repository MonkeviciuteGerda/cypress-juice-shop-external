const incorrectCredentialsTests = [
    {
        field: 'email',
        body: {
            email: 'incorrectEmail',
            password: Cypress.env('password'),
        },
    },
    {
        field: 'password',
        body: {
            email: Cypress.env('email'),
            password: 'incorrectPassword',
        },
    },
    {
        field: 'credentials',
        body: {
            email: 'incorrectEmail',
            password: 'incorrectPassword',
        },
    },
];

describe('POST User API tests', () => {
    it('should be able to login with correct credentials', () => {
        const body = {
            email: Cypress.env('email'),
            password: Cypress.env('password'),
        };

        cy.request({
            method: 'POST',
            url: '/rest/user/login',
            body,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys('authentication');
            expect(response.body.authentication).to.have.all.keys('bid', 'token', 'umail');
            expect(response.body.authentication.umail).to.eq(Cypress.env('email'));
        });
    });

    incorrectCredentialsTests.forEach((test) => {
        it(`should not be able to login with incorrect ${test.field}`, () => {
            cy.request({
                method: 'POST',
                url: '/rest/user/login',
                body: test.body,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.eq('Invalid email or password.');
            });
        });
    });
});

import ApiRequests from '../utils/apiRequests.utils';

const apiRequests = new ApiRequests();

Cypress.Commands.add('login', (email, password) => {
    apiRequests.getToken(email, password).then((token) => {
        cy.setCookie('token', token);
        cy.setCookie('cookieconsent_status', 'dismiss');
        cy.setCookie('welcomebanner_status', 'dismiss');
        window.localStorage.setItem('token', token);
    });
});

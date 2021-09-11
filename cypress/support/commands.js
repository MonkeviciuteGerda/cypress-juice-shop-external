import 'cypress-file-upload';
import ApiRequests from '../utils/apiRequests.utils';

const apiRequests = new ApiRequests();

Cypress.Commands.add('login', (email, password) => {
    apiRequests.getToken(email, password).then((authentication) => {
        cy.setCookie('token', authentication.token);
        cy.setCookie('cookieconsent_status', 'dismiss');
        cy.setCookie('welcomebanner_status', 'dismiss');
        window.localStorage.setItem('token', authentication.token);
        window.sessionStorage.setItem('bid', authentication.bid);
    });
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

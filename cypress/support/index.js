import './commands';
import Cleanup from '../utils/cleanup.utils';

const cleanup = new Cleanup();

before(() => {
    cleanup.cleanupAddresses(Cypress.env('email'), Cypress.env('password'));
});

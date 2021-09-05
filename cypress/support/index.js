/// <reference types='cypress-tags' />

import './commands';
import 'cypress-mochawesome-reporter/register';

import Cleanup from '../utils/cleanup.utils';

const cleanup = new Cleanup();

before(() => {
    cleanup.cleanupAddresses(Cypress.env('email'), Cypress.env('password'));
});

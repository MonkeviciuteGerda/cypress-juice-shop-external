import ComplaintPage from '../page-objects/complaint/complaintPage';

const complaint = {
    text: `My cypress complaint ${Math.floor(Math.random() * 100000000)}`,
    file: 'complaint.pdf',
};

const confirmationMessageText = 'Customer support will get in touch with you soon! Your complaint reference is #';

describe('Complaint tests', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        ComplaintPage.openComplaintPage();
    });

    it(['smoke', 'regression'], 'should be able to submit a complaint', () => {
        ComplaintPage.submitComplaint(complaint);
        ComplaintPage.assertConfirmationMessage(confirmationMessageText);
    });
});

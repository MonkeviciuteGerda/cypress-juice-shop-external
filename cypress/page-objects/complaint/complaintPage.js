class ComplaintPage {
    getMessageTextarea() {
        return cy.get('#complaintMessage');
    }

    getFileInput() {
        return cy.get('#file');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getConfirmationMessage() {
        return cy.get('.confirmation');
    }

    openComplaintPage() {
        cy.visit('/#/complain');
    }

    submitComplaint(complaint) {
        this.getMessageTextarea().type(complaint.text);
        this.getFileInput().attachFile(complaint.file);
        this.getSubmitButton().click();
    }

    assertConfirmationMessage(text) {
        this.getConfirmationMessage().should('contains.text', text);
    }
}

export default new ComplaintPage();

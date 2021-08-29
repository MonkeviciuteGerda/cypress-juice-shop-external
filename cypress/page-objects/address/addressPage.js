import AddressForm from './addressForm';

class AddressPage {
    get addressForm() {
        return new AddressForm();
    }

    openAddressPage() {
        cy.visit('/#/address/saved');
    }

    getAddNewAddressButton() {
        return cy.get('[data-cy="add-new-address-button"]');
    }

    getNthTableRow(nth) {
        return cy.get('[data-cy="addresses-table"] mat-row').eq(nth);
    }

    getLastTableRow() {
        return cy.get('[data-cy="addresses-table"] mat-row').last();
    }

    getRowFullNameColumnValue() {
        return cy.get('[data-cy="full-name"]');
    }

    getRowAddressColumnValue() {
        return cy.get('[data-cy="address"]');
    }

    getRowCountryColumnValue() {
        return cy.get('[data-cy="country"]');
    }

    getRowEditButton() {
        return cy.get('[data-cy="edit-button"]');
    }

    getRowDeleteButton() {
        return cy.get('[data-cy="delete-button"]');
    }

    openNewAddressForm() {
        this.getAddNewAddressButton().click();
    }

    assertAddressTableLastRow(details) {
        this.getLastTableRow().within(() => {
            this.getRowFullNameColumnValue().should('contain.text', details.fullName);
            this.getRowAddressColumnValue().should('contain.text', details.streetAddress);
            this.getRowCountryColumnValue().should('contain.text', details.country);
            this.getRowEditButton().should('be.visible');
            this.getRowDeleteButton().should('be.visible');
        });
    }

    openLastAddressForEdit() {
        this.getLastTableRow().within(() => {
            this.getRowEditButton().click();
        });
    }
}

export default new AddressPage();

export default class AddressForm {
    getCountryInputField() {
        return cy.get('[data-cy="country-input"]');
    }

    getNameInputField() {
        return cy.get('[data-cy="name-input"]');
    }

    getMobileNumberInputField() {
        return cy.get('[data-cy="mobile-number-input"]');
    }

    getZipCodeInputField() {
        return cy.get('[data-cy="zip-code-input"]');
    }

    getAddressTextareaField() {
        return cy.get('[data-cy="address-textarea"]');
    }

    getCityInputField() {
        return cy.get('[data-cy="city-input"]');
    }

    getStateInputField() {
        return cy.get('[data-cy="state-input"]');
    }

    getSubmitButton() {
        return cy.get('[data-cy="submit-button"]');
    }

    fillInAddress(details) {
        this.getCountryInputField().clear().type(details.country);
        this.getNameInputField().clear().type(details.fullName);
        this.getMobileNumberInputField().clear().type(details.mobileNum);
        this.getZipCodeInputField().clear().type(details.zipCode);
        this.getAddressTextareaField().clear().type(details.streetAddress);
        this.getCityInputField().clear().type(details.city);
        this.getStateInputField().clear().type(details.state);
    }

    submitAddressForm() {
        this.getSubmitButton().click();
    }
}

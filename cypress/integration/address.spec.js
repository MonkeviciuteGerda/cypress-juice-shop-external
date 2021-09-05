import ApiRequests from '../utils/apiRequests.utils';
import AddressPage from '../page-objects/address/addressPage';

const apiRequests = new ApiRequests();

const addressName = `Cypress random address name ${Math.floor(Math.random() * 100000000)}`;
const addressDetails = {
    country: 'Country',
    fullName: addressName,
    mobileNum: 1234567890,
    zipCode: '12345',
    streetAddress: 'Address',
    city: 'City',
    state: 'State',
};
const expectedNewAddressDetailsInTable = {
    fullName: addressDetails.fullName,
    streetAddress: `${addressDetails.streetAddress}, ${addressDetails.city}, ${addressDetails.state}, ${addressDetails.zipCode}`,
    country: addressDetails.country,
};
const editAddressDetails = {
    country: 'Country2',
    fullName: `2${addressName}`,
    mobileNum: 1234567891,
    zipCode: '12346',
    streetAddress: 'Address2',
    city: 'City2',
    state: 'State2',
};
const expectedEditedAddressDetailsInTable = {
    fullName: editAddressDetails.fullName,
    streetAddress: `${editAddressDetails.streetAddress}, ${editAddressDetails.city}, ${editAddressDetails.state}, ${editAddressDetails.zipCode}`,
    country: editAddressDetails.country,
};

describe('Address Page tests', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        AddressPage.openAddressPage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        Cypress.Cookies.preserveOnce('token', 'cookieconsent_status', 'welcomebanner_status');
    });

    it(['smoke', 'regression'], 'should be able to create new address', () => {
        AddressPage.openNewAddressForm();
        AddressPage.addressForm.fillInAddress(addressDetails);
        AddressPage.addressForm.submitAddressForm();

        AddressPage.assertAddressTableLastRow(expectedNewAddressDetailsInTable);
    });

    it(['smoke', 'regression'], 'should be able to edit existing address', () => {
        apiRequests.createAddress(addressDetails);

        cy.reload();
        AddressPage.assertAddressTableLastRow(expectedNewAddressDetailsInTable);

        AddressPage.openLastAddressForEdit();
        AddressPage.addressForm.fillInAddress(editAddressDetails);
        AddressPage.addressForm.submitAddressForm();

        AddressPage.assertAddressTableLastRow(expectedEditedAddressDetailsInTable);
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });
});

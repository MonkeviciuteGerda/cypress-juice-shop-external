import ApiRequests from './apiRequests.utils';

const apiRequests = new ApiRequests();

export default class Cleanup {
    cleanupAddresses(email, password) {
        apiRequests.getToken(email, password).then((authentication) => {
            apiRequests.getAddresses(authentication.token).then((addresses) => {
                addresses.data.forEach((address) => {
                    apiRequests.deleteAddress(authentication.token, address.id);
                });
            });
        });
    }
}

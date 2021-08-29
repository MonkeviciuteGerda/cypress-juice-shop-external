import ApiRequests from './apiRequests.utils';

const apiRequests = new ApiRequests();

export default class Cleanup {
    cleanupAddresses(email, password) {
        apiRequests.getToken(email, password).then((token) => {
            apiRequests.getAddresses(token).then((addresses) => {
                addresses.data.forEach((address) => {
                    apiRequests.deleteAddress(token, address.id);
                });
            });
        });
    }
}

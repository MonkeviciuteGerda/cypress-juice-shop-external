export default class ApiRequests {
    getToken(email, password) {
        const body = {
            email,
            password,
        };

        return cy
            .request({
                method: 'POST',
                url: '/rest/user/login',
                body,
            })
            .then((response) => {
                return response.body.authentication.token;
            });
    }

    getAddresses(token) {
        return cy
            .request({
                method: 'GET',
                url: '/api/Addresss',
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                return response.body;
            });
    }

    deleteAddress(token, id) {
        cy.request({
            method: 'DELETE',
            url: `/api/Addresss/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            return response.body;
        });
    }
}

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
                return response.body.authentication;
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

    createAddress(details) {
        const token = window.localStorage.getItem('token');

        cy.request({
            method: 'POST',
            url: '/api/Addresss/',
            body: details,
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    getUserBasket(token, bid) {
        return cy
            .request({
                method: 'GET',
                url: `/rest/basket/${bid}`,
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                return response.body;
            });
    }

    deleteProductsFromBasket(token, bid) {
        this.getUserBasket(token, bid).then((basket) => {
            if (basket.data.Products.length !== 0) {
                basket.data.Products.forEach((product) => {
                    let productId = product.BasketItem.id;
                    this.deleteProductFromBasket(token, productId);
                });
            }
        });
    }

    deleteProductFromBasket(token, productId) {
        return cy.request({
            method: 'DELETE',
            url: `/api/BasketItems/${productId}`,
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

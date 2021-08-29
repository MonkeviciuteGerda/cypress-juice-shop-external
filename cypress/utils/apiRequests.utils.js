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
}

Cypress.Commands.add('login', (email, password) => {
    const body = {
        email,
        password,
    };

    cy.request({
        method: 'POST',
        url: '/rest/user/login',
        body,
    }).then((response) => {
        const token = response.body.authentication.token;
        cy.setCookie('token', token);
        cy.setCookie('cookieconsent_status', 'dismiss');
        cy.setCookie('welcomebanner_status', 'dismiss');
        window.localStorage.setItem('token', token);
    });
});

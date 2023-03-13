const keys = require('../keys')

module.exports = function(email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Registration was successful',
        html: `
            <h1>Welcome to our store.</h1>
            <p>You created an account with email - ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Go to the app</a>
        `
    }
}
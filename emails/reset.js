const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset the password',
        html: `
            <h1>Reset your password?</h1>
            <p>If not just ignore this email</p>
            <p>Else click on the link</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Go to the app</a>
        `
    }
}
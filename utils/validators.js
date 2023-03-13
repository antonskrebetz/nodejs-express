const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Write a correct email')
        .custom(async (value, req) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('The user already exist')
                }
            } catch(e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'The password should be min 6 symbols')
        .isLength({min: 6, max: 16})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The passwords must match')
            }
            return true
        })
        .trim(),
    body('name', 'The name should be more than 3 symbols')
        .isLength({min: 3})
        .trim()
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Min length - 3 symbols').trim(),
    body('price').isNumeric().withMessage('Write correct price'),
    body('img', 'Write a correct url').isURL()
]
const { body } = require('express-validator');

/**
 * SignUp Validator for SignUp API
 * @exports signInValidator
 */
exports.signUpValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name should not be empty!')
        .bail()
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Name should be alphabetic')
        .isLength({ min: 2, max: 30 })
        .withMessage('Name Should be min 2 max 30 character'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email should not be empty!')
        .bail()
        .isEmail()
        .withMessage('Please Enter a valid Email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty!')
        .bail()
        .isLength({min:5,max:10})
        .withMessage('Password Should be min 5 max 10 Long')
        .isAlphanumeric()
        .withMessage('Password should be AlphaNumeric'),
    body('confirm_password')
        .trim()
        .notEmpty()
        .withMessage('Confirm Password should not be empty!')
        .bail()
        .custom(async (confirmPassword, { req }) => {
            const password = await (req.body.password);
            if (password !== confirmPassword) {
                throw new Error("Password and Confirm Does't Matched");
            }
        })
];

/**
 * LogIn Validator for Login API
 * @exports logInValidator
 */
exports.logInValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email should not be empty!')
        .bail()
        .isEmail()
        .withMessage('Please Enter a valid Email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty!'),
];

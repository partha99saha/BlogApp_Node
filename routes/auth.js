const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.put('/signup',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('EmailId already exsists!');
                        }
                    })
                    .catch(err => { console.log(err) });
            }).normalizeEmail(),
        body('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('please enter a Name'),
        body('password')
            .trim()
            .isAlphanumeric()
            .isLength({ min: 5 })
            .withMessage('please Password with alphanumic keys')
    ],
    authController.signup);


router.put('/login',
    [],
    authController.login);


module.exports = router;
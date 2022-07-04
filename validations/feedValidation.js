const { body } = require('express-validator');

exports.createValidator = [
    body('title')
        .notEmpty()
        .withMessage('Title should not be empty!')
        .bail()
        .isString()
        .withMessage('Title should be Alphabetic')
        .isLength({ min: 5, max: 50 })
        .withMessage('Title Should be min 5 Length'),
    body('content')
        .notEmpty()
        .withMessage('Content should not be empty!')
        .bail()
        .isString()
        .withMessage('Content should be Alphabetic')
        .isLength({ min: 5, max: 500 })
        .withMessage('Content Should be min 5 Length')
];

exports.updateValidator = [
    body('title')
        .optional({ nullable: true })
        .isString()
        .withMessage('Title should be Alphabetic')
        .isLength({ min: 5, max: 50 })
        .withMessage('Title Should be min 5 Length'),
    body('content')
        .optional({ nullable: true })
        .isString()
        .withMessage('Content should be Alphabetic')
        .isLength({ min: 5, max: 500 })
        .withMessage('Content Should be min 5 Length')
]
const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
// const { validationResult } = require('express-validator');

// const validateResult = async (req, res, next) => {
//   const errors = await validationResult(req);
//   if (!errors.isEmpty()) {
//     //console.log(errors);
//     return res.status(400)
//       .json({ 'error': errors.array()[0].msg });
//   }
//   next();
// };

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router;

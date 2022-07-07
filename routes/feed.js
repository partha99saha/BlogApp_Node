const express = require('express');
const { body } = require('express-validator');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// const feedValidator = require('../validations/feedValidation');
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

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;

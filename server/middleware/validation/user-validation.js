const { body, check, validationResult } = require('express-validator');

exports.validateUser = [
  check('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please enter username')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('Please enter password'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
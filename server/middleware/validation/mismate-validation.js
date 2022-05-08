const { body, check, validationResult } = require('express-validator');

exports.validateMismate = [
  check('sku')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please scan an item')
    .bail()
    .isInt()
    .withMessage('Invalid scan')
    .bail(),
  check('side')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Please choose a side')
    .bail()
    .isIn(['right', 'left'])
    .withMessage('Invalid side')
    .bail(),
  check('hasBox')
    .trim()
    .escape()
    .isBoolean()
    .withMessage('Please indicate if the box is present')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
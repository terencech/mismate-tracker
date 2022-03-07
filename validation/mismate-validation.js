const { check, validationResult } = require('express-validator');

exports.validateMismate = [
  check('scan')
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
  check('has-box')
    .trim()
    .escape()
    .isIn('on', '')
    .withMessage('Please indicate if item has a box')
    .bail()
    .toBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    next();
  }
];
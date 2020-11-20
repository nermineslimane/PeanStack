const { check } = require('express-validator/check');

module.exports.create = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('firstname should nor be empty')
    .trim()
    .escape()
    .withMessage('firstname is reauired'),
  check('lastName').not().isEmpty().trim().escape(),
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('should be q emqil reauired'),
  check('phoneNumber').isMobilePhone(),
];

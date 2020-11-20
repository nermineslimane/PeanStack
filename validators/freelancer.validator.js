const { check } = require('express-validator/check');

module.exports.create = [
  check('firstName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('firstname is required'),
  check('lastName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('lastName is required'),
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is required and formatted'),
  check('phoneNumber')
    .isMobilePhone()
    .withMessage('Phone number is required and formatted'),
];

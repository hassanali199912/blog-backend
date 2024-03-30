const { body } = require("express-validator");

const createComment = [
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .trim()
    .isString(),
  body("review")
    .notEmpty()
    .withMessage("review is required")
    .trim()
    .isNumeric(),
];

module.exports = {
  createComment,
};

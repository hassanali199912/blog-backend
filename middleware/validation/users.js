const { body } = require("express-validator");
const User = require("../../models/users");

const userSignupValidation = [
  body("name").notEmpty().withMessage("Name is required").trim().isString(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .custom(async (value, { req }) => {
      //check if email is already registered
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email is already registered");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .trim()
    .isString(),
];
const userLoginValidation = [
  body("email").notEmpty().withMessage("email is required").trim().isEmail(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .trim()
    .isString(),
];

module.exports = {
  userSignupValidation,
  userLoginValidation,
};

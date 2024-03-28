const { body } = require("express-validator");

const createPost = [
  body("title").notEmpty().withMessage("title is required").trim().isString(),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .trim()
    .isString(),
  body("imageUrl")
    .notEmpty()
    .withMessage("imageUrl is required")
    .trim()
    .isString(),
  body("caterogry")
    .notEmpty()
    .withMessage("caterogry is required")
    .trim()
    .isString(),
];

const updatedPost = [
  body("title").notEmpty().isString().withMessage("Title is required"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required"),
  body("imageUrl").notEmpty().isString().withMessage("imageUrl is required"),
  body("caterogry").notEmpty().isString().withMessage("caterogry is required"),
];

module.exports = {
  createPost,
  updatedPost,
};

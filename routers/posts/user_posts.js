const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/auth/is_auth");
const postController = require("../../controllers/posts/posts");
const postMiddleware = require("../../middleware/validation/post");

//users routes
router.post(
  "/create",
  isAuth,
  postMiddleware.createPost,
  postController.create
);
router.post(
  "/update/:postId",
  isAuth,
  postMiddleware.updatedPost,
  postController.update
);
router.delete("/delete/:postId", isAuth, postController.deleted);

module.exports = router;

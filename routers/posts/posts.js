const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/auth/is_auth");

const postControllers = require("../../controllers/posts/posts");
const commentsController = require("../../controllers/comments/comment");
const likesController = require("../../controllers/likes/likes");
const commentsMiddelware = require("../../middleware/validation/comment");

//generals
router.get("/", postControllers.getAll);
router.get("/getsingle/:postId", postControllers.getById);

//comment
router.get("/comment/get/:postId", commentsController.getAll);
router.post(
  "/comment/create",
  isAuth,
  commentsMiddelware.createComment,
  commentsController.createComment
);

//likes
router.get("/like/:postId",isAuth, likesController.like_unlike);
router.get("/getAllLikes/:postId", likesController.getAll);

module.exports = router;

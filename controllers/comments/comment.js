const User = require("../../models/users");
const Posts = require("../../models/post");
const Comment = require("../../models/comments");
const HelperClass = require("../../util/helper");

const createComment = async (req, res, next) => {
  try {
    HelperClass.checkForValidationResult(req);
    const user = await User.findById(req.userId);
    if (!user) {
      HelperClass.throwError(404, "User not found");
    }

    const post = await Posts.findById(req.body.postId);

    if (!post) {
      HelperClass.throwError(404, "Data not found");
    }
    const newComment = new Comment({
      post: req.body.postId,
      user: req.userId,
      comment: req.body.comment,
      review: req.body.review,
    });
    await newComment.save();
    post.$set({ reviews: [...post.reviews, req.body.review] });
    await post.save();

    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate({
        path: "user",
        select: "name email image",
      })
      .sort({ createdAt: -1 });
    res.status(201).json({
      status: "success",
      message: "data fetched successfully",
      data: comments,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = {
  createComment,
  getAll,
};

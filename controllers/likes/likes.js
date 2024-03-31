const User = require("../../models/users");
const Posts = require("../../models/post");
const HelperClass = require("../../util/helper");

const like_unlike = async (req, res, next) => {
  try {
    console.log();
    const user = await User.findById(req.userId);
    if (!user) {
      HelperClass.throwError(404, "User not found");
    }
    const post = await Posts.findById(req.params.postId);
    if (!post) {
      HelperClass.throwError(404, "Data not found");
    }

    const isLiked = post.likes.includes(req.userId);

    if (!isLiked) {
      post.$set({
        likes: [...post.likes, user._id.toString()],
      });
    } else {
      post.$set({
        likes: post.likes.filter(
          (like) => like.toString() !== req.userId.toString()
        ),
      });
    }
    await post.save();

    res.status(201).json({
      status: "success",
      message: "Like created successfully",
      data: post.likes,
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
    const post = await Posts.findById(req.params.postId);
    if (!post) {
      HelperClass.throwError(404, "Data not found");
    }

    res.status(201).json({
      status: "success",
      message: "data fetched successfully",
      data: post.likes,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = {
  like_unlike,
  getAll,
};

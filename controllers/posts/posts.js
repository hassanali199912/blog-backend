const Helper = require("../../util/helper");

const User = require("../../models/users");
const Post = require("../../models/post");

// Admin Controllers
const create = async (req, res, next) => {
  try {
    Helper.checkForValidationResult(req);
    const user = await User.findById(req.userId);
    if (!user) {
      Helper.throwError(404, "User not found");
    }
    const post = new Post(req.body);

    post.set({ auther: user._id });

    await post.save();

    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    Helper.checkForValidationResult(req);

    const user = await User.findById(req.userId);
    if (!user) {
      Helper.throwError(404, "User not found");
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      Helper.throwError(404, "Data not found");
    }

    if (post.auther.toString() !== req.userId.toString()) {
      Helper.throwError(401, "You are not authorized to update this post");
    }
    post.set(req.body);
    await post.save();
    res.status(201).json({
      status: "success",
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const deleted = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      Helper.throwError(404, "User not found");
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      Helper.throwError(404, "Data not found");
    }

    if (post.auther.toString() !== req.userId.toString()) {
      Helper.throwError(401, "You are not authorized to update this post");
    }

    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      Helper.throwError(404, "Data not found");
    }

    res.status(201).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//User Controllers

const getAll = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate({
      path: "auther",
      select: "name email image -_id",
    });
    if (!posts) {
      Helper.throwError(404, "Data not found");
    }

    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "auther",
      select: "name email image -_id",
    });
    if (!post) {
      Helper.throwError(404, "Data not found");
    }

    res.status(200).json({
      status: "success",
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = {
  create,
  update,
  deleted,
  //user functions
  getAll,
  getById
};

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    review: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Comment", commentSchema);

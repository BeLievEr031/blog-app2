import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const CommentModel = new mongoose.model("CommentsModel", commentSchema);

export default CommentModel;

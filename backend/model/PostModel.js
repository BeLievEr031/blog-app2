import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
});

const PostModel = new mongoose.model("PostModel", postSchema);
export default PostModel;

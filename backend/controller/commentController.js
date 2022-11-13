import { response } from "express";
import CommentModel from "../model/CommentModel.js";
export const newComment = async (req, res) => {
  try {
    const comment = await CommentModel(req.body);
    await comment.save();
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

export const delComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    await comment.delete();
    return res.status(200).json({
      status: true,
      msg: "Comment Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }

  // res.send("del");
};

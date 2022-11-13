import PostModel from "../model/PostModel.js";
const createPost = async (req, res) => {
  try {
    const post = await new PostModel(req.body);

    await post.save();
    return res.status(200).json({
      status: true,
      msg: post,
    });
  } catch (err) {
    return res.json({ status: false, msg: err.message });
  }
};

const getAllPost = async (req, res) => {
  const category = req.query.category;
  console.log(category);
  let allPost;
  try {
    if (category) {
      allPost = await PostModel.find({ category: category });
    } else {
      allPost = await PostModel.find({});
    }
    return res.status(200).json(allPost);
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

const detailView = async (req, res) => {
  let id = req.params.id;
  try {
    const post = await PostModel.findById({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  // console.log(req.params.id);
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(500).json({
        status: false,
        msg: "post not found...",
      });
    }

    await PostModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(200).json({
      status: true,
      msg: "POst Updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
    });
  }
};

const delPost = async (req, res) => {
  console.log(req.params.id);

  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status().json({
        status: false,
        msg: "Post Not found..",
      });
    }
    await post.delete();

    return res.status(200).json({
      status: true,
      msg: "Post Deleted",
    });
  } catch (error) {
    return res.status().json({
      status: false,
      msg: error.message,
    });
  }
};
export { createPost, getAllPost, detailView, updatePost, delPost };

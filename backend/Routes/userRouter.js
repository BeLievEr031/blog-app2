import express from "express";
import AuthController from "../controller/AuthController.js";
import {ImageController,getImage} from "../controller/ImageController.js";
import {newComment,getComments,delComment} from "../controller/commentController.js";
import upload from "../middleware/upload.js";
import authenticateToken from "../middleware/jwtAuth.js"
import {createPost,getAllPost,detailView,updatePost, delPost} from "../controller/postController.js"
const userRouter = express.Router();

userRouter.route("/signup").post(AuthController.registerUser);
userRouter.route("/login").post(AuthController.loginUser);
userRouter.route("/file/upload").post(upload.single("file"),ImageController.uploadImg);
userRouter.route("/file/:filename").get(getImage);
userRouter.route("/create").post(authenticateToken,createPost);
userRouter.route("/post").get(authenticateToken,getAllPost);
userRouter.route("/detail/:id").get(authenticateToken,detailView);
userRouter.route("/update/:id").put(authenticateToken,updatePost);
userRouter.delete("/delete/:id",authenticateToken, delPost);
userRouter.post("/comment",authenticateToken,newComment);
userRouter.get("/getcomment/:id",authenticateToken,getComments);
userRouter.delete("/comment/delete/:id",authenticateToken,delComment);

export default userRouter;
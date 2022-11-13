import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnection.js";
import userRouter from "./Routes/userRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use("/",userRouter);


dbConnect();

const PORT = 4500 || process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
});
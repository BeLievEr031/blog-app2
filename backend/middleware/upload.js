import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
const storage = new GridFsStorage({
  url: process.env.DB_URI,
  option: {
    useNewUrlParser: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image.jpeg"];
    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: Date.now() + "-blog-" + file.originalname,
    };
  },
});
export default multer({ storage });

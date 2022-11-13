import Grid from "gridfs-stream";
import mongoose from "mongoose";
class ImageController {
  static uploadImg = (req, res) => {
    const url = `http://localhost:4500`;
    if (!req.file) {
      return res.status(404).json({ status: false, msg: "File NOt found..." });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    // console.log(imageUrl);
    res.status(200).json({ imageUrl });
  };
}

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});


const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      filename: req.params.filename,
    });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    // const readStream = gridfsBucket.openDownloadStream(file._id);
    // readStream.pipe(res);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { ImageController ,getImage};

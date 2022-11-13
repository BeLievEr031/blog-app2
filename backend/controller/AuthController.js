import UserModel from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthController {
  static registerUser = async (req, res) => {
    const { name, username, password } = req.body;
    console.log(req.body);
    if (!name || !username || !password) {
      return res.status(500).json({
        status: false,
        msg: "All Fields required....",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      username,
      password: hashedPass,
    };

    try {
      const user = new UserModel(newUser);
      await user.save();
      console.log(user);
      res.status(200).json({
        status: true,
        msg: user,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  };

  static loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(500).json({
        status: false,
        msg: "All fields required..",
      });
    }

    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return res.status(500).json({
          status: false,
          msg: "Wrong Credentials..",
        });
      }

      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        return res.status(500).json({
          status: false,
          msg: "Wrong Credentials..",
        });
      }

      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      res.status(200).json({
        status: true,
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  };
}

export default AuthController;

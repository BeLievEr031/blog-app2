import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "token is missing" });
    }

    req.user = user;
    // console.log("i m a from -->",user);
    next();
  });
};

export default authenticateToken;

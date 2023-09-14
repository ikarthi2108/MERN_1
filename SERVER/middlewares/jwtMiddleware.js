require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken=(req, res, next)=> {

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;

require('dotenv').config()
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Assuming you store the JWT in a cookie
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;

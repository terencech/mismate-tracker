const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']?.split[1];

  if (token) {
    req.user = jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: 'Failed to authenticate'
      })
      req.user = {
        id: decoded.id,
        username: decoded.username
      };
      next();
    });
  } else {
    res.json({
      isLoggedIn: false,
      message: 'Incorrect token'
    });
  }
}

module.exports = verifyToken;
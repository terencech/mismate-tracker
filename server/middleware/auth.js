const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) res.status(403).send('No token found');

  try {
    req.user = jwt.verify(token, process.env.TOKEN_KEY);
  } catch {
    return res.status(401).send('Invalid token');
  }

  next();
}

module.exports = verifyToken;
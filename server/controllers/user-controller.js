const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
  const { name, password } = req.body;

  console.log({ name, password });

  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  UserModel.create({
    name,
    password: encryptedPassword,
  }, (err, user) => {
    if (err) return res.json(err);

    const token = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY,
      { expiresIn: '8h' }
    );
    user.token = token;

    res.json(user);
  });
}
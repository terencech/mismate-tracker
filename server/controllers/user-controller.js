const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  console.log({ username, password });

  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  UserModel.findOne({
    username
  }, (err, user) => {
    if (user) return res.json({ message: "User already exists" });

    UserModel.create({
      username,
      password: encryptedPassword,
    }, (err, user) => {
      if (err) return res.json({ message: err });
  
      const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        { expiresIn: '8h' }
      );
      user.token = token;
  
      res.json(user);
    });
  });
}

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt by ' + username);

  UserModel.findOne({ username })
    .select('+password')
    .exec((err, user) => {
      if (err) return res.json({
        message: 'Invalid username or password'
      });

      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('User found, comparing password to hash');
        jwt.sign(
          user.toJSON(),
          process.env.TOKEN_KEY,
          { expiresIn: '8h' },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              message: 'Success',
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.json({
          message: 'Invalid username or password'
        });
      }
    });
}

exports.getUsername = (req, res) => {
  res.json({
    isLoggedIn: true,
    username: req.user.username
  })
}

exports.returnAuth = (req, res) => {
  res.json({
    isLoggedIn: true,
    username: req.user.username
  });
}
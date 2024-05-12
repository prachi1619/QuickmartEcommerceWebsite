const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

module.exports.register = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin || false;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: 'User is registered successfully.',
      user: savedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let user;

  User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        return res.status(400).json({
          message: 'Username is not valid!'
        });
      }
      user = foundUser;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(400).json({
          message: 'Password is not correct!'
        });
      }
      // Generate the JWT
      const token = jwt.sign(
        {
          id: user._id.toString(),
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '7d'
        }
      );
      res.status(200).json({
        message: 'User is logged in successfully.',
        token,
        userId: user._id.toString(),
        isAdmin: user.isAdmin
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};
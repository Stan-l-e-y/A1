const db = require('../models');
const User = db.users;

var jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid Password' });
    }

    let token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: user.id,
      },
      'secret'
    );

    res.send({
      id: user.id,
      email: user.email,
      jwt: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while retrieving user.',
    });
  }
};

exports.signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Content can not be empty! Email and Password are required!',
    });
    return;
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const data = await user.save(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while creating the User.',
    });
  }
};

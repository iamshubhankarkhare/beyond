const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');


// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log(email, name, password, password2);

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.send({
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.send({
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        console.log("signing up");

        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.send({ signedIn: true })
              })
              .catch(err => console.log(err));
          });
        });
      }
    });

  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log("login called");
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.send({ message: "Please fill all the fields!" })
  }
  else {

    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        res.send({ message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log("match called");
          var token = jwt.sign({ email: email }, 'shhhhh');

          res.send({
            token: token

          })
        } else {
          res.send({ message: 'Password incorrect' });
        }
      });
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

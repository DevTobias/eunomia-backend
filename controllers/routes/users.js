/* eslint-disable no-console */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user.model');

//* ---------- REGISTER A NEW ACCOUNT ACCOUNT ----------- *\\
router.route('/register').post((req, res) => {
  const query = { email: req.body.email };

  User.findOne(query, async (mdbError, doc) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (doc) res.status(400).json({ message: 'user already exists' });
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        personal_list: {
          lists: [],
        },
      });
      await newUser.save()
        .then(() => res.status(200).json({
          message: 'user successfully added',
          newUser,
        }))
        .catch((saveError) => res.status(500).json(saveError.toString()));
    }
  }).catch((findError) => res.status(500).json(findError.toString()));
});

//* ---------- LOGIN TO EXISTING ACCOUNT ----------- *\\
router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (mdbError, user) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (!user) res.status(400).json({ message: 'wrong username or password' });
    else {
      req.logIn(user, (loginError) => {
        if (loginError) res.status(500).json(loginError.toString());
        res.status(400).json({ message: 'succesfully authenticated', user });
      });
    }
  })(req, res, next);
});

module.exports = router;

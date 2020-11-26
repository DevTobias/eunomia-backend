/* eslint-disable no-console */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user.model');

//* ------------------------------------- *\\
//* ---------- Authentication ----------- *\\
//* ------------------------------------- *\\

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
        lists: [[]],
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
        res.status(200).json({ message: 'succesfully authenticated', user });
      });
    }
  })(req, res, next);
});

//* ---------- IS AUTHENTICATED ----------- *\\
router.route('/is-authenticated').post((req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'authenticated' });
  } else {
    res.status(400).json({ message: 'not authenticated' });
  }
});

//* --------------------------------------- *\\
//* ---------- User information ----------- *\\
//* --------------------------------------- *\\

router.route('/get-name').get((req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'successfully sent username', fullname: req.user.fullname });
  } else {
    res.status(400).json({ message: 'not authenticated' });
  }
});

router.route('/get-lists').post((req, res) => {
  const query = { email: req.user.email };

  User.findOne(query, async (mdbError, doc) => {
    if (mdbError) res.status(500).json(mdbError.toString());
    if (!doc) res.status(400).json({ message: 'authentication error' });
    else {
      res.status(200).json({ message: 'successfully sent user lists', lists: doc.lists });
    }
  }).catch((findError) => res.status(500).json(findError.toString()));
});

router.route('/save-lists').post((req, res) => {
  if (req.user) {
    const query = { email: req.user.email };
    const update = { lists: req.body.lists };
    const options = { returnNewDocument: true };

    User.findOneAndUpdate(query, update, options)
      .then((updatedDocument) => {
        if (!updatedDocument) res.status(400).json({ message: 'could not save lists' });
        res.status(200).json({ message: 'successfully saved lists' });
      })
      .catch((err) => res.status(500).json(`Error: ${err}`));
  } else res.send('Not logged in');
});

module.exports = router;

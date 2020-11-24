/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');

module.exports = function auth(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, (mdbError, user) => {
        if (mdbError) throw mdbError;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (bcryptErr, result) => {
          if (bcryptErr) throw bcryptErr;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (mdbError, user) => {
      const userInformation = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      };
      cb(mdbError, userInformation);
    });
  });
};

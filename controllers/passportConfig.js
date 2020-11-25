/* eslint-disable no-underscore-dangle */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./models/user.model');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    User.findOne({ email }, async (findError, user) => {
      if (findError) return done(findError);
      if (!user) return done(null, false, { message: 'no user with that email' });
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        }
        return done(null, false, { message: 'password incorrect' });
      } catch (authError) {
        return done(authError);
      }
    }).catch((findError) => done(findError));
  };

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.email));

  passport.deserializeUser((email, done) => {
    User.findOne({ email }, (err, user) => {
      const userInformation = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      };
      return done(null, userInformation);
    }).catch((findError) => done(findError));
  });
}

module.exports = initialize;

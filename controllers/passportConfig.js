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
  }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        id: user._id,
        username: user.username,
        forname: user.forname,
        surname: user.surname,
        email: user.email,
      };
      return done(err, userInformation);
    });
  });
}

module.exports = initialize;

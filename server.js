/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

//* ---------- SERVER DEPENDENCIES ----------- *\\
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
// const MemoryStore = require('memorystore')(session);

require('bcryptjs');
require('dotenv').config();

const initializePassport = require('./controllers/passportConfig');

initializePassport(passport);

const app = express();
const port = process.env.PORT || 5000;

// app.set('trust proxy', 1);

//* ---------- MIDDLEWARES ----------- *\\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'https://eunomia-frontend.herokuapp.com', credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

/* app.use(session({
  cookie: {
    secure: true,
    maxAge: 60000,
  },
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
  resave: false,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
})); */

app.use(passport.initialize());
app.use(passport.session());

//* ---------- DATABASE CONNECTION ----------- *\\
const uri = process.env.ATLAS_URI;
const databaseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(uri, databaseOptions);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB database connection established successfully');
});

//* ---------- ROUTES ----------- *\\
const usersRouter = require('./controllers/routes/users');

app.use('/users', usersRouter);

//* ---------- START SERVER ----------- *\\
app.listen(port, () => console.log(`Server is running on port ${port}`));

//* ---------- TESTING ----------- *\\
module.exports = app;

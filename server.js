/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

//* ---------- SERVER DEPENDENCIES ----------- *\\
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//* ---------- MIDDLEWARES ----------- *\\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ secret: 'secretcode', resave: true, saveUninitialized: true }));
app.use(cookieParser('secretcode'));

app.use(passport.initialize());
app.use(passport.session());
require('./controllers/passportConfig')(passport);

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

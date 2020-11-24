const router = require('express').Router();

router.route('/register').get((_req, res) => {
  res.send('Register a new user!');
});

module.exports = router;

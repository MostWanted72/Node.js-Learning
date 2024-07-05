const express = require('express');
const landingData = require('./landing');

const router = express.Router();

router.get('/users', (req, res, next) => {
  const users = landingData.users;
  res.render('users', { docTitle: 'Users', users })
})

module.exports = router;
const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
  res.render('landing', { docTitle: 'Add User'})
})

router.post('/', (req, res, next) => {
  users.push({ name: req.body.user });
  res.redirect('/users')
})

exports.route = router;
exports.users = users;
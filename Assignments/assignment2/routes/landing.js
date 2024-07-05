const express = require('express');
const path = require('path');

const routeDir = require('../utills/path')

const router = express.Router();

router.use('/', (req, res, next) => {
  res.sendFile(path.join(routeDir, 'views', 'landing.html'))
})

module.exports = router;
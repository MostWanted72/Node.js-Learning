const express = require('express');
const path = require('path');

const routeDir = require('../utils/path');

const router = express.Router();

// because we are not using next() here, the middleware will stop after the excuations
// response for url path /add-products
// /admin/add-products   ===> GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(routeDir, 'views', 'add-product.html'))
  
  // Allows the request to continue to next middleware in line
  // next();
})

// /admin/product   ===> POST
// same as app.use but only handle post requests.
router.post('/product', (req, res, next) => {
  console.log('check this body', req.body)
  res.redirect('/')
})

module.exports = router;
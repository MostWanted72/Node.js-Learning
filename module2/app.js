const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// because we are not using next() here, the middleware will stop after the excuations
// response for url path /add-products
app.use('/add-products', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  )
  
  // Allows the request to continue to next middleware in line
  // next();
})

app.use('/product', (req, res, next) => {
  console.log('check this body', req.body)
  res.redirect('/')
})

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from mars</h1>')  // sets request header content type automatically
})

app.listen(3000)
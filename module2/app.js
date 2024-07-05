const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))  // express.static is a middleware which serves static files, like css, images etc

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'))
})

app.listen(3000)
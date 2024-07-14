const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');
const pageNotFoundController = require('./controllers/pageNotFound');
const sequelize = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // express.static is a middleware which serves static files, like css, images etc

app.use('/admin', adminRoutes);
app.use(shopRoute);

app.use(pageNotFoundController.pageNotFound);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log('sequelize error', error));

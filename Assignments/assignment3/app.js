const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/users');
const landingDAta = require('./routes/landing');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(userRoute);
app.use(landingDAta.route);

app.listen(4000);
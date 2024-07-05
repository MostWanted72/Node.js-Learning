const express = require('express');
const path = require('path');

const usersRoute = require('./routes/users');
const landingRout = require('./routes/landing');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(usersRoute);
app.use(landingRout);

app.listen(4000)
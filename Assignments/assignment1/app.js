const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   next();
// })

// app.use((req, res, next) => {
//   res.send('<h1>Products</h1>');
// })

app.use('/users', (req, res, next) => {
  res.send('<h1>Welcome New Users</h1>')
})

app.use('/', (req, res, next) => {
  res.send('<h1>Home Page</h1>');
})

app.listen(4000);
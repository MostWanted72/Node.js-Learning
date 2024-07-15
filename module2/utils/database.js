const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'xavi', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

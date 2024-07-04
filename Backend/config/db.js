const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Nome e local do arquivo do banco de dados SQLite
});

module.exports = sequelize;

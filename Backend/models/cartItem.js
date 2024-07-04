const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

CartItem.belongsTo(Product);

module.exports = CartItem;

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FoodItem = sequelize.define('FoodItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Lunch Box', 'ဟင်းပွဲ', 'မြန်မာ အစားအစာ', 'တရုတ် အစားအစာ', 'အသုပ်', 'အချိုရည်', 'Add On']]
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'tam_food_items',
  timestamps: false
});

module.exports = FoodItem;



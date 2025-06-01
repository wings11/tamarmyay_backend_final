const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'table_number'
  },
  isOccupied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_occupied'
  }
}, {
  tableName: 'tam_tables',
  timestamps: false
});

module.exports = Table;
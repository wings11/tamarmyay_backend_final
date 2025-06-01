const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AdminPin = sequelize.define('AdminPin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('NOW'),
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('NOW'),
    field: 'updated_at'
  }
}, {
  tableName: 'admin_pin',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
});

module.exports = AdminPin;
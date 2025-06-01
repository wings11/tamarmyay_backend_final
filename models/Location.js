const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  buildingName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'building_name'
  }
}, {
  tableName: 'tam_locations',
  timestamps: false
});

module.exports = Location;
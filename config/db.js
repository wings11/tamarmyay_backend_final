const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tamarmyay',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'WaiYanKyaw2001',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = { sequelize };
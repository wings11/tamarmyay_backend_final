// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false
//   }
// );

// module.exports = { sequelize };
// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, // Default to 5432 for Supabase
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Required for Supabase
        rejectUnauthorized: false, // Disable certificate verification
      },
    },
    logging: console.log, // Enable for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 3, // Retry on connection errors
      match: [/SequelizeConnectionError/],
    },
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = { sequelize, Sequelize }; // Export both sequelize and Sequelize
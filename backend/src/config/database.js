const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'cer_database',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 1433,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5, // Max connections
      min: parseInt(process.env.DB_POOL_MIN) || 0, // Min connections
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000, // Max time to acquire connection
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000 // Max idle time
    },
    dialectOptions: process.env.DB_DIALECT === 'mssql' ? {
      options: {
        encrypt: true,
        enableArithAbort: true
      }
    } : {}
  }
);

module.exports = { sequelize };

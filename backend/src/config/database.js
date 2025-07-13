const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'master',
  process.env.DB_USER || 'sa',
  process.env.DB_PASSWORD || 'Dieguito1',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 1433,
    dialect: process.env.DB_DIALECT || 'mssql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5, // Max connections
      min: parseInt(process.env.DB_POOL_MIN) || 0, // Min connections
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000, // Max time to acquire connection
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000 // Max idle time
    },
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true // For local development
      }
    }
  }
);

module.exports = { sequelize };

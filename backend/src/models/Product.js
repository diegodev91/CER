const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('clothing', 'accessories', 'collectibles', 'media'),
    allowNull: false
  },
  images: {
    type: DataTypes.TEXT, // Array of image URLs stored as JSON string
    allowNull: true,
    get() {
      const value = this.getDataValue('images');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value || []));
    }
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  weight: {
    type: DataTypes.DECIMAL(8, 2), // for shipping calculations
    allowNull: true
  },
  dimensions: {
    type: DataTypes.TEXT, // {length, width, height} stored as JSON string
    allowNull: true,
    get() {
      const value = this.getDataValue('dimensions');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('dimensions', value ? JSON.stringify(value) : null);
    }
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;

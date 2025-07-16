import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Stock from './Stock.js';

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  previousShares: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  avgPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

User.hasMany(Portfolio);
Portfolio.belongsTo(User);
Stock.hasMany(Portfolio);
Portfolio.belongsTo(Stock);

export default Portfolio;
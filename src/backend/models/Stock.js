import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Stock = sequelize.define('Stock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  change: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  changePercent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  marketCap: {
    type: DataTypes.STRING,
  },
  volume: {
    type: DataTypes.INTEGER,
  },
  pe: {
    type: DataTypes.DECIMAL(10, 2),
  },
  dividend: {
    type: DataTypes.DECIMAL(5, 2),
  },
});

export default Stock; 
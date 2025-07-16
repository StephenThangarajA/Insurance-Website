import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('investment_db', 'root', 'Stephen14$', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB }; 
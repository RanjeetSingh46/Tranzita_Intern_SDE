const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'ranjeet', '12345', {
  host: 'localhost',
  dialect: 'mssql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;

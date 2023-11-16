const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false
  }
);

console.log(User === sequelize.models.User); // true

module.exports = User;

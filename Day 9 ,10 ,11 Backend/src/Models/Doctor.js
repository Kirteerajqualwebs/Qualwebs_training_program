
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Doctor;

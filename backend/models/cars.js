const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cars = sequelize.define("cars", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  number_plate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: { type: Sequelize.STRING, allowNull: true },
  colour: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  model: { type: Sequelize.STRING, allowNull: true },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Cars;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('park_anywhr', 'root', 'rootPass@123', {
    dialect: "mysql",
    host: 'localhost'
});

module.exports = sequelize;
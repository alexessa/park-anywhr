const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ParkingArea = sequelize.define('parking_area', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = ParkingArea;
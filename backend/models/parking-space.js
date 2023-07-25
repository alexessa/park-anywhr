const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ParkingSpace = sequelize.define('parking_space', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    space_key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    parking_area_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = ParkingSpace;
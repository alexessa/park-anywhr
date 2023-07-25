const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Bookings = sequelize.define('bookings', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_car_number_plate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parking_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parking_area_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parking_space_key: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parking_date_time: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

module.exports = Bookings;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Director = sequelize.define('Director', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bitrhday: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Director;
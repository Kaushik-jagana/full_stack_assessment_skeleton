// models/Home.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Home = sequelize.define('Home', {
    home_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    street_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sqft: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    baths: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    list_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}
    ,
    {
        tableName: 'home', 
        timestamps: false, 
    });

module.exports = Home;

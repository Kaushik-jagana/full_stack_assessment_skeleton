const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Home = require('./Home');

const UserHome = sequelize.define('UserHome', {
    username: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username',
        },
    },
    home_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Home,
            key: 'home_id',
        },
    },
}, {
    tableName: 'user_home_relation', 
    timestamps: false, 
});

User.belongsToMany(Home, { through: UserHome, foreignKey: 'username' });
Home.belongsToMany(User, { through: UserHome, foreignKey: 'home_id' });

module.exports = UserHome;

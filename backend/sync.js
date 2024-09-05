const sequelize = require('./config/database');
const User = require('./models/User');
const Home = require('./models/Home');
const UserHome = require('./models/userHome');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};

module.exports = syncDatabase;



const express = require('express');
const bodyParser = require('body-parser');
const syncDatabase = require('./sync');
const User = require('./models/User');
const Home = require('./models/Home');
const UserHome = require('./models/userHome');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/user/find-all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/home/find-by-user', async (req, res) => {
    const { username } = req.query;
    try {
        const user = await User.findOne({
            where: { username },
            include: Home,
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.Homes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/user/find-by-home', async (req, res) => {
    const { homeId } = req.query;
    try {
        const home = await Home.findOne({
            where: { home_id: homeId },
            include: User,
        });
        if (!home) return res.status(404).json({ error: 'Home not found' });
        res.json(home.Users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// index.js
app.put('/home/update-users', async (req, res) => {
    const { homeId, users } = req.body;
    try {
        const home = await Home.findByPk(homeId);
        if (!home) return res.status(404).json({ error: 'Home not found' });

        await home.setUsers(users);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await syncDatabase(); // Sync database when the server starts
});

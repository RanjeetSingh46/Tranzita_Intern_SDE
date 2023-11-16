const express = require("express");
const sequelize = require('./database');
const User = require('./User');

sequelize.sync({ force: true }).then(() => console.log("Database is Ready"));

const app = express();

app.use(express.json());

app.post('/insertData', async (req, res) => {
    try {
        const dt = await User.create(req.body);
        res.send('User is inserted');
    } catch (error) {
        res.status(500).send('Error inserting user');
    }
});

app.get('/showData', async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.get('/findData/:id', async (req, res) => {
    try {
        const requestedId = req.params.id;
        const user = await User.findOne({ where: { id: requestedId } });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error finding user');
    }
});

app.put('/updateData/:id', async (req, res) => {
    try {
        const requestedId = req.params.id;
        const user = await User.findOne({ where: { id: requestedId } });
        if (user) {
            await user.update(req.body);
            res.send('Updated the data');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

app.get('/removeData/:id', async (req, res) => {
    try {
        const requestedId = req.params.id;
        const deletedCount = await User.destroy({ where: { id: requestedId } });
        if (deletedCount > 0) {
            res.send('Data removed');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error removing user');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

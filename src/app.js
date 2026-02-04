require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const User = require('./modals/User');
const app = express();

//middleware to parse JSON request bodies
app.use(express.json());

//API to create new user
app.post('/signup', async (req, res) => {
    //creating new instance of user model
    const user = new User(req.body)
    try {
        console.log('Saving user:', user);
        await user.save();
        res.send('User created successfully');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send(err);
        return;
    }

})

//API to get user by email
app.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found');
        } 
        res.send(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send(err);
    }
})  

//API TO GET ALL USERS
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send(err);
    }
})

connectDB().then(() => {
    console.log('Connected to the database successfully');
    app.listen(3000, (() => {
        console.log('Server is running on port 3000');
    }))
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the application if the database connection fails
});






app.use("/hello", (req, res) => {
    res.send("hello");
})

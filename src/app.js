require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const User = require('./modals/User');
const {validateSignupData}= require('./utils/validation');
const bcrypt = require('bcrypt');
const app = express();

//middleware to parse JSON request bodies
app.use(express.json());

//API to create new user
app.post('/signup', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    validateSignupData(req.body);
    const passswordHash = await bcrypt.hash(password, 10);
    



    //creating new instance of user model
    const user = new User({...req.body, password: passswordHash})
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

//logiin API
app.post('/login', async (req, res) => {
const { email, password } = req.body;
try{
  const user= await User.findOne({email:email});
  if(!user){
    return res.status(404).send('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(401).send('Invalid password');
  }else{
    res.send('Login successful');
  }
}catch(err){
    console.error('Error during login:', err);
    res.status(500).send(err);  
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

//API TO up
app.patch('/user/:userId', async (req, res) => {
    const UserId = req.params.userId;
    const data =req.body
    const allowedUpdates = [ 'photourl', 'about', 'skillSet'];
    const isAllowed = Object.keys(data).every(key => allowedUpdates.includes(key));
    if (!isAllowed) {
        return res.status(400).send('Invalid update fields');
    }
    try {
        const user = await User.findByIdAndUpdate(UserId, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send(err);
    }
})

//api to delete user
app.delete('/user', async (req, res) => {
    const UserId = req.body._id;
    try {
        const user = await User.findByIdAndDelete(UserId);  
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err); 
        res.status(500).send(err);          
    }})

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

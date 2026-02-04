require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const User = require('./modals/User');
const app= express();
app.post('/signup', async(req,res)=>{

    const user = new User({
        firstName: "sridhara",
        lastName: "ganapathi",
        email: "sri@gmail.com",
        password: "sri123",
       
    })
    try{
        console.log('Saving user:', user);
await user.save();
res.send( 'User created successfully');
    }catch(err){
        console.error('Error saving user:', err);
        res.status(500).send(err);
        return;
    }
   
})

connectDB().then(() => {
    console.log('Connected to the database successfully');
    app.listen(3000, (() => {
        console.log('Server is running on port 3000');
    }))
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    // process.exit(1); // Exit the application if the database connection fails
});






app.use("/hello", (req, res) => {
    res.send("hello");
})
// app.use("/",(req,res)=>{
//     res.send("Hello World from Express.js dashboard!");
// })

app.get("/user", (req, res) => {
    res.json({ name: "John", age: 30 });
})
app.post("/user", (req, res) => {
    res.json({ status: "Data received" });
})
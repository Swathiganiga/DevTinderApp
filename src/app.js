const express =require('express');

const app=express();

app.listen(3000,(()=>{
    console.log('Server is running on port 3000');
}))



app.use("/hello",(req,res)=>{
    res.send("hello");
})
// app.use("/",(req,res)=>{
//     res.send("Hello World from Express.js dashboard!");
// })

app.get("/user",(req,res)=>{
    res.json({name:"John", age:30});
})
app.post("/user",(req,res)=>{
    res.json({status:"Data received"});
})
//1. importing express
const express=require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const connectDB = require('./database/database');

const cors=require('cors')
const fileUpload=require('express-fileupload')


//2. creating an express app
const app=express();

// josn config
app.use(express.json())


//File upload config
app.use(fileUpload())
app.use(express.static('./public'))

//cors config
const corsOptions ={
    origin:true,
    credentials: true,
    optionSuccessStatus:200

}
app.use(cors(corsOptions))

//configuration dotenv
dotenv.config()


//connecting to the databades
connectDB();

app.use('/public', express.static('public'));


//3. deffining the port
const PORT=process.env.PORT;


//5. creating a test route or endpoint= request pathaunye kam garxa end point lye 
app.get('/test',(req,res)=>{
    res.send("Test Api is Working.....!")
})

app.get('/print',(req,res)=>{
    res.send("Print Api is Working.....!")
})

// Configuring user routes
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/jewelery',require('./routes/jeweleryRoutes'))

//routeresult
//http://localhost:5500/api/user/create


//4. starting the server
app.listen(PORT, ()=>{
    console.log(`Server-app is running on port ${PORT}`)
})


//API URL
// http://localhost:5500/test 
//write a function 
//importing package
//always export the function 


//importing the package
const mongoose=require('mongoose');
// creating a function 
const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_CLOUDURL).then(()=>{
        console.log("Database Connected successfully")
    })
    
}


//3.Exporting the function 
module.exports=connectDB;


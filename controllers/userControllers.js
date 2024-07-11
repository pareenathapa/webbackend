// make a function (Logic)
const userModel=require('../models/userModel')
const  bcrypt= require("bcrypt")
const jwt=require('jsonwebtoken')



// 1. Creating user function
const createUser=async(req,res)=>{
    //1. Get data from the user (Fname,lname, email,pp)

   
    
    //#.Destructuring
    const {firstName,lastName,email,password,confirmPassword}=req.body;

    //2. validation 
    if(!firstName ||!lastName||!email ||!password||!confirmPassword){
        return res.json({
            "success":false,
            "message":"Please enter all fields!"
        })
    }                                                        // != first name xaina vanye hunxa meaning 
    //try- catch (error Handling)
    try{
        //check if the user is already exist
        const existingUser= await userModel.findOne({email: email})
        if (existingUser){
            return res.json({
                "success":false,
                "message":"User Already Exists!"
            })
        }


        // Hash /encrypt the password
        const randomSalt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,randomSalt)


        //Save the user in database 
        const newUser=new userModel({
            //Fields:Values received from user 
            firstName : firstName,
            lastName: lastName,
            email :email,
            password :hashPassword,
            confirmPassword:hashPassword,
        })
        
        //Actually save the user in database 
        await newUser.save()             //certain time launa sakxa VANYE Await launye ho


        // Send the success response
        res.json({
            "success":true,
            "message":"User created successfully"
        })


    }catch(error){
        console.log(error)                               //resposce pathai ra ko ho catch ma 
        res.json({
            "success":false,
            "message":"internal Server Error!"

        })

    }  

}
// 2.login user function 
const loginUser=async(req,res)=>{
    // res.send('Login user api in working!')
    // check incomming data
    console.log(req.body)
    // destructuring 
    const {email,password}=req.body;
    ///validation
    if (!email||!password){
        return res.json({
            "success":false,
            "message":"please enter all fields!"
        })
    }
    try{
        //1. find user, if not :stop the process
        const user =await userModel.findOne({email:email})
        if (!user){
            return res.json({
                "success":false,
                "message":"user not found!"
            })
        }
        //2.compare the password, if not :stop the process
        const isValidPassword= await bcrypt.compare(password,user.password)
        if (!isValidPassword){
            return res.json({
                "success":false,
                "message":"Incorrect password!"
            })
        }

        //3.generate JWT token
        //3.1 secret decryption key(.env)
        const token= await jwt.sign(
            {id:user._id},
            "SECRET"
        )
        ///4. send the token, userdata,message to the user 
        res.json({
            "success":true,
            "message":"Login Successful",
            "token":token,
            "userData":user
        })
    

    }catch(error){
        console.log(error)
        res.json({
            "success":false,
            "message":"internal server error!"
        })
    }


}


// exporting 
module.exports= {
    createUser,
    loginUser
}

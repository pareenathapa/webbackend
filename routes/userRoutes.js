const { Router } = require('express')

const router=require('express').Router()
const userControllers=require('../controllers/userControllers')




// Make a create user API
router.post('/create',userControllers.createUser)
//login user api
router.post('/login',userControllers.loginUser)


// exporting 
module.exports=router;


//controllers --Routes--(index.js)

const router = require('express').Router()
const jeweleryController = require('../controllers/jeweleryController')
const {adminGuard,authGuard}=require('../middleware/authGuard')

// Make a create Jewelery API
router.post('/create',jeweleryController.createJewelery)

// fetch all
// http://localhost:5000/api/jewelery/get_all_jewelerys
router.get('/get_all_jewelerys' ,jeweleryController.getAllJewelerys)

// fetch single jewelery
// If POST, body(data)
router.get('/get_single_jewelery/:id', jeweleryController.getJewelery)

// // delete Jewelery
router.delete('/delete_jewelery/:id', jeweleryController.deleteJewelery)

// // update jewelery
router.put('/update_jewelery/:id', jeweleryController.updateJewelery)

// exporting
module.exports = router;

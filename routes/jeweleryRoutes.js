// jeweleryRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { authGuard, adminGuard }  = require('../middleware/authGuard');
const {
    createJewelery,
    getAllJewelery,
    getJeweleryById,
    updateJewelery,
    deleteJewelery
} = require('../controllers/jeweleryController');

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Define routes
router.post('/', authGuard, upload.single('jeweleryImage'), createJewelery);
router.get('/', authGuard, getAllJewelery);
router.get('/:id', authGuard, getJeweleryById);
router.put('/:id', authGuard, upload.single('jeweleryImage'), updateJewelery);
router.delete('/:id', authGuard, deleteJewelery);

module.exports = router;

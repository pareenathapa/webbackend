const path = require('path');
const jeweleryModel = require('../models/jeweleryModel');
const fs = require('fs');

const createJewelery = async (req, res) => {
    try {
        const { jeweleryName, jeweleryPrice, jeweleryCategory, jeweleryDescription } = req.body;

        // Validate incoming data
        if (!jeweleryName || !jeweleryPrice || !jeweleryCategory || !jeweleryDescription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check jewelery image
        if (!req.files || !req.files.jeweleryImage) {
            return res.status(400).json({
                success: false,
                message: "Image not found!"
            });
        }

        const { jeweleryImage } = req.files;

        // Upload image
        const imageName = `${Date.now()}-${jeweleryImage.name}`;
        const imageUploadPath = path.join(__dirname, `../public/jewelerys/${imageName}`);

        await jeweleryImage.mv(imageUploadPath);

        // Save to database
        const newJewelery = new jeweleryModel({
            jeweleryName,
            jeweleryPrice,
            jeweleryCategory,
            jeweleryDescription,
            jeweleryImage: imageName
        });

        const jewelery = await newJewelery.save();

        res.status(201).json({
            success: true,
            message: "Jewelery created!",
            data: jewelery
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllJewelerys=async(req,res)=> {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const jewelerys = await jeweleryModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalJewelerys = await jeweleryModel.countDocuments();
        const totalPages = Math.ceil(totalJewelerys / limit);

        res.json({
            success: true,
            jewelerys,
            totalPages
        });
    } catch (error) {
        console.log('---', error)
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }

   
}

const getJewelery = async (req, res) => {
    try {
        const { id } = req.params;
        const jewelery = await jeweleryModel.findById(id);
        if (!jewelery) {
            return res.status(404).json({
                success: false,
                message: "Jewelery not found"
            });
        }
        res.status(200).json({
            success: true,
            jewelery
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteJewelery = async (req, res) => {
    try {
    await jeweleryModel.deleteOne({_id: req.params.id});
    res.status(200).json({
        success: true,
        message: 'Deleted.'
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Not Deleted.'
        }) 
    }
}

const updateJewelery = async (req, res) => {
    const { jeweleryName, jeweleryPrice, jeweleryCategory, jeweleryDescription } = req.body;
    try {
        await jeweleryModel.updateOne({_id: req.params.id}, req.body);
        res.status(200).json({
            success: true,
            message: 'Updated.'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Not Updated.'
        })  
    }
}

// Other CRUD operations for jewelery management...

module.exports = {
    createJewelery,
    getAllJewelerys,
    getJewelery,
    updateJewelery,
    deleteJewelery
};

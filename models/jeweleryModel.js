const mongoose = require('mongoose');

const jewelerySchema = new mongoose.Schema({
    // fields : NAME, PRICE, DESCRIPTION, IMAGE, CATEGORY
    jeweleryName : {
        type : String,
        required : true,
    },
    jeweleryPrice : {
        type : Number,
        required : true,
    },
    jeweleryDescription : {
        type : String,
        required : true,
        maxlength : 300,
    },
    jeweleryCategory : {
        type : String,
        required : true,
    },
    jeweleryImage : {
        type : String,
        required : true,
    },
    createdAt :{
        type : Date,
        default : Date.now,
    }

});

// exporting
const Jewelerys = mongoose.model('jewelerys', jewelerySchema);
module.exports = Jewelerys;



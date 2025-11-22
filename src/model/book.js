const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },

    author:{
        type:String,
        required: true
    },

    ISBN:{
        type: String,
        required: true
    },
    
    publication_Date:{
        type: Date,
        required: true
    },

    genre:{
        type: String,
        required: true
    },

    copies:{
        type:Number,
        required: true
    }


  
})

module.exports = mongoose.model("book",bookSchema);
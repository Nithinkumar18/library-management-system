const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true
    },

    email:{
        type:String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    role:{
       type: String,
       required: true,
       enum: ["admin","member"]
    },

})

module.exports = mongoose.model("user",userSchema);
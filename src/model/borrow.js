const mongoose = require('mongoose');
const user = require('../model/user');
const book = require('../model/book');

const borrowSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:user
  },

  bookId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:book
  }
})

module.exports = mongoose.model("borrow",borrowSchema);
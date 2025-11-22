const borrow = require('../model/borrow');
const bookService = require('../service/bookService');
const responseInfo = require('../constants/responseInfo')


const borrowBook = async(borrowData) => {
    try{
     const viewBookCopies = await bookService.getBook(borrowData.bookId);
     const {copies} = viewBookCopies;
     if(copies > 0){
      
      const borrow_Details = await borrow.create(borrowData);
      const updateBookCopies = await bookService.updateBookCopies(borrowData.bookId,responseInfo.BORROW_ACTION);
      const {author,title,ISBN,publication_Date,genre} = updateBookCopies;
      return {
       borrowI: borrow_Details._id,
       Author:author,
       Title:title,
       ISBN:ISBN,
       publication: publication_Date,
       Genre: genre
      }

     }
     else{
        return null;
     }
    }
    catch(err){
        throw err;
    }
}


const returnBook = async(borrowData) => {
    try{
     const updateBookCopies = await bookService.updateBookCopies(borrowData.bookId,responseInfo.RETURN_ACTION);
     const returnDetails = await borrow.findByIdAndDelete({'_id':borrow_Details._id});
      return {
         return: responseInfo.BOOK_RETURN
      }

     }
     catch(err){
        throw err;
    }
     
    }

    const userBorrowHistory = async(userID) => {
        try{
           const myHistory = await borrow.find({userId:userID});
           return myHistory;
        }
        catch(err){
           throw err;
        }
    }

    module.exports = {
        borrowBook,
        returnBook,
        userBorrowHistory

    }
    

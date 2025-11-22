const book = require('../model/book');
const logger = require('../loggers/logger');
const rInfo = require('../constants/responseInfo');


const publishBook = async(bookData) => {
    try{
      const book_id = await book.create(bookData);
      logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_REGESTRATION_SUCCESS}`)
      return book_id;
    }
    catch(err){
        logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_REGESTRATION_FAIL}`);
        throw err;
    }
}

const viewBooks = async() => {
    try{
        const books_collection = await book.find();
        logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_SUCCESS}`)
        return books_collection
    }
    catch(err){
        logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_FAIL}`);
        throw err;
    }
}

const getBook = async(book_id) => {
    try{
        const myBook = await book.findOne({'_id':book_id});
        logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_SUCCESS}`)
        return myBook
    }
    catch(err){
         logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_FAIL}`);
        throw err;
    }
}
const updateBook = async(bId,bookData) => {
 try{
   const updatedInfo = await book.findByIdAndUpdate({'_id':bId},{$set:bookData},{new:true});
    logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_UPDATE_SUCCESS}`);
    return updatedInfo;
 }
 catch(err){
      logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_UPDATE_FAILED}`);
      throw err;
 }
}


const unsyncBook = async(bookId) => {
    try{
       const unsyncBookDetails = await book.findByIdAndDelete({'_id':bookId});
        logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_UNSYNCED}`);
        return unsyncBookDetails;
       
    }
    catch(err){
      logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_UNSYNCED_FAIL}`);
      throw err;
    }
}

const viewByAuthor = async(author_name) => {
    try{
       const booksByAuthor = await book.find({author:author_name});
       logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_SUCCESS}`)
       return booksByAuthor
    }
    catch(err){
       logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_FAIL}`);
        throw err;
    }
}

const viewByGenre = async(genre_cat) => {
    try{
         const booksByGenre = await book.find({genre:genre_cat});
         logger.info(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_SUCCESS}`)
         return booksByGenre
    }
    catch(err){
         logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_COLLECTION_FAIL}`);
        throw err;
    }
}

const updateBookCopies = async(bookID,action) => {
    try{
         if(action === rInfo.BORROW_ACTION){
            const updatedCopies = await book.findByIdAndUpdate({'_id':bookID},{$inc:{copies:-1}});
            return updatedCopies;
         }
         else{
            const returnedCopies = await book.findByIdAndUpdate({'_id':bookID},{$inc:{copies:1}});
            return returnedCopies
         }
    }
    catch(err){
        logger.error(`SERVICE - ${rInfo.BOOK_SERVICE} : ${rInfo.BOOK_UPDATE_FAILED}`);
      throw err;
    }
}
module.exports = {
    publishBook,
    viewByGenre,
    viewByAuthor,
    unsyncBook,
    updateBook,
    viewBooks,
    getBook,
    updateBookCopies

}
const bookService = require('../service/bookService');
const   responseInfo = require('../constants/responseInfo');
const httpCodes = require('../constants/httpConstants');
const logger = require('../loggers/logger');


const registerBook = async(req,res) => {
    try{
      const bData = req.body;
      const bookData = await bookService.publishBook(bData);
      logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`)
      return res.status(httpCodes.CREATED).json({Message:responseInfo.BOOK_REGESTRATION_SUCCESS,bookData});
    }
    catch(err){
       return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({Message:responseInfo.BOOK_REGESTRATION_FAIL,err});
    }
}

const fetchBooks = async(req,res) => {
    try{
        const books_collection = await bookService.viewBooks();
        logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`)
        return res.status(httpCodes.SUCCESS).json({books_collection})
    }
    catch(err){
        logger.error(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${responseInfo.BOOK_COLLECTION_FAIL}`);
       return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({Message:responseInfo.BOOK_COLLECTION_FAIL,err})
    }
}


const updateBookDetails = async(req,res) => {
 try{
    const b_id = req.params.id;
    const updateBInfo = req.body;
   const updatedInfo = await bookService.updateBook(b_id,updateBInfo);
    logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`);
    return res.status(httpCodes.SUCCESS).json({Message:responseInfo.BOOK_UPDATE_SUCCESS,updatedInfo});
 }
 catch(err){
      logger.error(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${responseInfo.BOOK_UPDATE_FAILED}`);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({MESSAGE:responseInfo.BOOK_UPDATE_FAILED,err});
 }
}


const deleteBook = async(req,res) => {
    try{
        const b_id = req.params.bId;
       const unsyncBookDetails = await bookService.unsyncBook(b_id);
        logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`);
        return res.status(httpCodes.SUCCESS).json({Message:responseInfo.BOOK_UNSYNCED,Book_ID:unsyncBookDetails._id});
       
    }
    catch(err){
      logger.error(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${responseInfo.BOOK_UNSYNCED_FAIL}`);
       return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({Message:responseInfo.BOOK_UNSYNCED_FAIL,err});
    }
}

const getBooksByAuthor = async(req,res) => {
    try{
       const author_v = req.params.author;
       const allAuthorBooks = await bookService.viewByAuthor(author_v);
       logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`)
       return res.status(httpCodes.SUCCESS).json({allAuthorBooks});
    }
    catch(err){
       logger.error(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${responseInfo.BOOK_COLLECTION_FAIL}`);
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({Message:responseInfo.BOOK_COLLECTION_FAIL,err});
    }
}

const getBooksByGenre = async(req,res) => {
   try{
       const genre_value = req.params.genre;
       const allBooks = await bookService.viewByGenre(genre_value);
       logger.info(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${req.path}`)
       return res.status(httpCodes.SUCCESS).json({allBooks});
    }
    catch(err){
       logger.error(`SERVICE - ${responseInfo.BOOK_SERVICE} : ${responseInfo.BOOK_COLLECTION_FAIL}`);
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({Message:responseInfo.BOOK_COLLECTION_FAIL,err});
    }
}

module.exports = {
    registerBook,
    fetchBooks,
    updateBookDetails,
    deleteBook,
    getBooksByAuthor,
    getBooksByGenre

}
const borrowService = require('../service/borrowService');
const   responseInfo = require('../constants/responseInfo');
const httpCodes = require('../constants/httpConstants');
const logger = require('../loggers/logger');

const borrowMyBook = async(req,res) => {
    try{
        
         const borrowData = req.body;
         logger.info(`SERVICE - ${responseInfo.BORROW_SERVICE} : ${req.path}`);
         const borrow = await borrowService.borrowBook(borrowData);
         if(enrolledUser.user_id){
            logger.info(`SERVICE - ${responseInfo.BORROW_SERVICE} : ${responseInfo.BOOK_BORROW}`)
            return res.status(httpCodes.CREATED).json({message: responseInfo.BOOK_BORROW,Id:borrow._id});
         }
    }
    catch(err){
           return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}



const returnBook = async (req,res) => {
    try{
       const  bookToReturn = req.params.borrowId
         logger.info(`SERVICE - ${responseInfo.BORROW_SERVICE} : ${req.path}`);
       const returnSuccess = await borrowService.returnBook(bookToReturn);
       return res.status(httpCodes.SUCCESS).json({Message:responseInfo.BOOK_RETURN,returnSuccess});
    }
    catch(err){
      
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_LOGIN,error:err.message});
    }
}


const myHistory = async(req,res) => {
    try{
         const userID = req.params.id;
         const myCollection = await borrowService.userBorrowHistory(userID);
         return res.status(httpConstants.SUCCESS).json({myCollection});
    }
    catch(err){
         return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = {
    borrowMyBook,
    returnBook,
    myHistory

}
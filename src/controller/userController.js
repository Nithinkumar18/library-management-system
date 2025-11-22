const userService = require('../service/userService');
const   responseInfo = require('../constants/responseInfo');
const httpCodes = require('../constants/httpConstants');
const logger = require('../loggers/logger');

const enrollUser = async(req,res) => {
    try{
        
         const userData = req.body;
         logger.info(`SERVICE - ${responseInfo.SERVICE} : ${req.path}`);
         const enrolledUser = await userService.registerUser(userData);
         if(enrolledUser.user_id){
            logger.info(`SERVICE - ${responseInfo.USER_SERVICE} : ${responseInfo.USER_REGESTRATION_SUCCESS}`)
            return res.status(httpCodes.CREATED).json({message: responseInfo.USER_REGESTRATION_SUCCESS,Id:enrolledUser.user_id});
         }
    }
    catch(err){
           return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}



const login = async (req,res) => {
    try{
       const uemail = req.body.email;
       const upassword = req.body.password;
       const validatedUser = await userService.userLogin(uemail,upassword);
       if(validatedUser.token){
        logger.info(`SERVICE: ${responseInfo.USER_SERVICE} | METHOD: ${req.method} | URL: ${req.url}`);
          return res.status(httpConstants.SUCCESS).json({message:responseInfo.LOGIN_SUCCESS,token:validatedUser.token});
       }
       else{
        logger.info(`SERVICE: ${responseInfo.USER_SERVICE} | METHOD: ${req.method} | URL: ${req.url}`);
         return res.status(httpConstants.NOT_FOUND).json({message:validatedUser.message});
       }
    }
    catch(err){
        logger.error(`SERVICE: ${responseInfo.USER_SERVICE} | METHOD: ${req.method} | URL: ${req.url} `,err);
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_LOGIN,error:err.message});
    }
}

module.exports = {
    enrollUser,
    login
}
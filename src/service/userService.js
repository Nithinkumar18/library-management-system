const user = require('../model/user');
const logger = require('../loggers/logger');
const bcrypt = require('bcrypt');
const info = require('../constants/responseInfo');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerUser = async (userResData) => {

    try {
         const preEncrypted = userResData.password;
         const encryptedPass = await hashPassword(preEncrypted);
         userResData.password = encryptedPass;
         const registeredUser = await user.create(userResData);

        logger.info(`SERVICE - ${info.USER_SERVICE} : ${info.USER_REGESTRATION_SUCCESS}`);
        logger.info(`Created User Info ${registeredUser._id}: created At: ${registeredUser.createdAt}`);
        return {
            user_id: registeredUser._id,
        }
    }
    catch (err) {
        logger.error(`SERVICE - ${info.USER_SERVICE} : ${info.USER_REGESTRATION_FAIL}`,err);
        throw new Error(info.USER_REGESTRATION_FAIL);
    }

}


const hashPassword = async (pwd) => {
    const hashRounds = parseInt(process.env.hashRounds,10);
    const encryptedPassword = await bcrypt.hash(pwd,hashRounds);
    return encryptedPassword;

}

const userLogin = async(uemail,upassword) => {
    try{
      logger.info(`SERVICE - ${info.USER_SERVICE} | User info lookup initiated `);
      const _user = await user.findOne({email:uemail});
      const enc_pass = _user.password;
      const isValidUser = await bcrypt.compare(upassword,enc_pass);
      if(isValidUser){
         const {role} = _user;
         const token = jwt.sign({uemail,role},process.env.JWT_SECRET,{expiresIn: '900sec'});
          logger.info(`SERVICE - ${info.USER_SERVICE} | MESSAGE:${info.TOKEN_GENERATED}`);
          return {
            token
          }
      }
      else{
       logger.info(`SERVICE: ${info.USER_SERVICE} | MESSAGE:${info.INVALID_USER_CREDENTIALS}`);
               return{
               
                  message: info.INVALID_USER_CREDENTIALS
               }
            }
    }
    catch(err){
       logger.error(`SERVICE: ${info.USER_SERVICE} | ERR-MESSAGE:${info.ERR_LOGIN}`,err);
        throw err;
    }
}

module.exports = {
    registerUser,
    userLogin
}
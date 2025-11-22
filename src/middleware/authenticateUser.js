
const jwt = require('jsonwebtoken');
const info = require('../constants/responseInfo');
const httpConstants = require('../constants/httpConstants');
require('dotenv').config();
const logger = require('../loggers/logger');

const validateToken = async(req,res,next) => {
    try{
         const _bToken = req.headers.authorization;
         if(!_bToken || !_bToken.startsWith('Bearer')){
            logger.info(`SERVICE: ${info.SERVICE} | MESSAGE:${info.TOKEN_UNDEFINED}`);
            return res.status(httpConstants.BAD_REQUEST).json({message:info.TOKEN_UNDEFINED});
         }
         const token = _bToken.split(' ')[1];
         const _verfiedToken = jwt.verify(token,process.env.JWT_SECRET);
         req.role = _verfiedToken.role;
         next();
    }
    catch(err){
        logger.info(`SERVICE: ${info.SERVICE} | ERR-MESSAGE:${info.TOKEN_EXPIRED}`);
       return res.status(httpConstants.UNAUTHORIZED).json({message:info.TOKEN_EXPIRED});
    }
}

module.exports = {
    validateToken
}
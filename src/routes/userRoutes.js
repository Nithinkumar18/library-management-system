const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.post('/login',userController.login);
router.post('/sign-up',userController.enrollUser);

module.exports = router;
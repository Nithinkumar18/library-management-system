const express = require('express');
const router = express.Router();
const borrowController = require('../controller/borrowController');
const {validateToken} = require('../middleware/authenticateUser');
const {authorizeRole} = require('../middleware/authorizeUser');


router.post('/borrow',validateToken,borrowController.borrowMyBook);
router.get('/history/:id',validateToken,borrowController.myHistory);
router.put('/return/:borrowId',validateToken,borrowController.returnBook);

module.exports = router;
const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const {validateToken} = require('../middleware/authenticateUser');
const {authorizeRole} = require('../middleware/authorizeUser');

router.get('/view',validateToken,bookController.fetchBooks);
router.get('/:genre',validateToken,bookController.getBooksByGenre);
router.get('/:author',validateToken,bookController.getBooksByAuthor);
router.post('/publish',validateToken,authorizeRole(["admin"],bookController.registerBook));
router.put('/:id',validateToken,authorizeRole(["admin"]),bookController.updateBookDetails);
router.delete('/:bId',validateToken,authorizeRole(["admin"]),bookController.deleteBook);

module.exports = router;
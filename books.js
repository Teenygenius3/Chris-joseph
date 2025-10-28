const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// POST /api/books - Add a new book
router.post('/', booksController.addBook);

// GET /api/books - Get all books
router.get('/', booksController.getAllBooks);

// PUT /api/books/:id - Update a book’s details
router.put('/:id', booksController.updateBook);

// DELETE /api/books/:id - Delete a book
router.delete('/:id', booksController.deleteBook);

module.exports = router;
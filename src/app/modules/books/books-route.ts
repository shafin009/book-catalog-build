// books-route.ts

import express from 'express';
import * as booksController from './books-controller';

const router = express.Router();

router.post('/books/create-book', booksController.createBookController);
router.get('/books', booksController.getBooks);
router.get('/books/:categoryId/category', booksController.getBooksByCategoryId);
router.get('/books/:id', booksController.getASingleBook);
router.patch('/books/:id', booksController.updatedBook);
router.delete('/books/:id', booksController.deletedBook);

export const booksRoutes = router;

import express from 'express';
import {
  createBookController,
  deletedBook,
  getASingleBook,
  updatedBook,
} from './books-controller';

const router = express.Router();

router.post('/books/create-book', createBookController);
router.get('/books/:id', getASingleBook);
router.patch('/books/:id', updatedBook);
router.delete('/books/:id', deletedBook);

export default router;

// books-route.ts

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import * as booksController from './books-controller';

const router = express.Router();

router.post(
  '/books/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  booksController.createBookController,
);
router.get(
  '/books',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  booksController.getAllBook,
);
router.get(
  '/books/:categoryId/category',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  booksController.getBooksByCategoryId,
);
router.get(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  booksController.getASingleBook,
);
router.patch(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  booksController.updatedBook,
);
router.delete(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  booksController.deletedBook,
);

export const booksRoutes = router;

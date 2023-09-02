import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from './category-controller';

const router = express.Router();

router.post(
  '/categories/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  createCategoryController,
);
router.get(
  '/categories',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  getAllCategoriesController,
);
router.get(
  '/categories/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  getSingleCategoryController,
);
router.patch(
  '/categories/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  updateCategoryController,
);
router.delete(
  '/categories/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  deleteCategoryController,
);

export const categoryRoutes = router;

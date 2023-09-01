import express from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from './category-controller';

const router = express.Router();

router.post('/categories/create-category', createCategoryController);
router.get('/categories', getAllCategoriesController);
router.get('/categories/:id', getSingleCategoryController);
router.patch('/categories/:id', updateCategoryController);
router.delete('/categories/:id', deleteCategoryController);

export const categoryRoutes = router;

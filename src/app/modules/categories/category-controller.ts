import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from './category-service';

export async function createCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title } = req.body;
    const category = await createCategory(title);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await getAllCategories();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const category = await getSingleCategory(id);
    if (!category) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Category not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category fetched successfully',
        data: category,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const category = await updateCategory(id, title);
    if (!category) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Category not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category updated successfully',
        data: category,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const category = await deleteCategory(id);
    if (!category) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Category not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category deleted successfully',
        data: category,
      });
    }
  } catch (error) {
    next(error);
  }
}

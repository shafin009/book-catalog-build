/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as booksService from './books-service';

export async function createBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookData = req.body;
    const book = await booksService.createBook(bookData);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBooks(req: Request, res: Response) {
  try {
    const {
      page = 1,
      size = 10,
      sortBy = 'title',
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      category,
      search,
    } = req.query;

    const parsedMinPrice = minPrice
      ? parseInt(minPrice as string, 10)
      : undefined;
    const parsedMaxPrice = maxPrice
      ? parseInt(maxPrice as string, 10)
      : undefined;

    const booksResponse = await booksService.getAllBooks(
      +page,
      +size,
      sortBy as string,
      sortOrder as 'asc' | 'desc',
      parsedMinPrice,
      parsedMaxPrice,
      category as string | undefined,
      search as string | undefined
    );

    if (booksResponse) {
      res.status(booksResponse.statusCode).json(booksResponse);
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        meta: {
          page: 1,
          size: 10,
          total: 0,
          totalPage: 0,
        },
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      meta: {
        page: 1,
        size: 10,
        total: 0,
        totalPage: 0,
      },
      data: [],
    });
  }
}

export const getBooksByCategoryId = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const { page, size } = req.query;
    const books = await booksService.getBooksByCategoryId(
      categoryId,
      page,
      size
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Books with associated category data fetched successfully',
      meta: {
        page: 1,
        size: 10,
        total: books.length,
        totalPage: Math.ceil(books.length / 10),
      },
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const getASingleBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await booksService.getSingleBook(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Book not found',
    });
  }
};

export const updatedBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookData = req.body;
    const updatedBook = await booksService.updateBook(id, bookData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const deletedBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await booksService.deleteBook(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Book is deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

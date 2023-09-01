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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      page,
      size,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      category,
      search,
    } = req.query;
    const { books, total } = await booksService.getAllBooks(
      page,
      size,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      category,
      search
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Books fetched successfully',
      meta: {
        page: parseInt(page as string, 10),
        size: parseInt(size as string, 10),
        total,
        totalPage: Math.ceil(total / parseInt(size as string, 10)),
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

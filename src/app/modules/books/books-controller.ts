import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  createBook,
  deleteBook,
  getSingleBook,
  updateBook,
} from './books-service';

export async function createBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookData = req.body;
    const book = await createBook(bookData);
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















export const getASingleBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await getSingleBook(id);
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
    const updatedBook = await updateBook(id, bookData);
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
    const deletedBook = await deleteBook(id);
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

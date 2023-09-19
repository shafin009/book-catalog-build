/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as booksService from './books-service';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { Book } from '@prisma/client';
import { BookFilterField } from './book-interface';

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

export const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await booksService.getBooksByCategoryId(id, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result?.meta,
    data: result?.data,
  });
});
export const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterField);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await booksService.getAllBook(filters, paginationOptions);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successful',
    meta: result?.meta,
    data: result?.data,
  });
});

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Book, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { BookSearchField } from './book-interface';

const prisma = new PrismaClient();

export async function createBook(bookData: Book): Promise<Book> {
  const book = await prisma.book.create({
    data: bookData,
    include: {
      category: true,
    },
  });
  return book;
}

export const getSingleBook = async (id: string) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw new Error('Error fetching book');
  }
};

export const updateBook = async (id: string, bookData: any) => {
  try {
    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: bookData,
    });
    return updatedBook;
  } catch (error) {
    throw new Error('Error updating book');
  }
};

export const deleteBook = async (id: string) => {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });
    return deletedBook;
  } catch (error) {
    throw new Error('Error deleting book');
  }
};

export const getBooksByCategoryId = async (
  id: string,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : { createdAt: 'desc' },
    include: {
      category: true,
    },
  });
  const total = await prisma.book.count({
    where: {
      categoryId: id,
    },
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

export const getAllBook = async (
  filters: any,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, category, minPrice, maxPrice, ...filtersData }: any = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: BookSearchField.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const minPriceFloat = parseFloat(minPrice);
  const maxPriceFloat = parseFloat(maxPrice);
  if (!isNaN(minPriceFloat)) {
    andConditions.push({
      price: {
        gte: minPriceFloat,
      },
    });
  }

  if (!isNaN(maxPriceFloat)) {
    andConditions.push({
      price: {
        lte: maxPriceFloat,
      },
    });
  }

  if (category !== undefined) {
    andConditions.push({
      categoryId: {
        equals: category,
      },
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : { createdAt: 'desc' },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

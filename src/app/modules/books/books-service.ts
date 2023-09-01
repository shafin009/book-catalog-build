/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Book, Prisma, PrismaClient } from '@prisma/client';

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

export const getAllBooks = async (
  page: any,
  size: any,
  sortBy: any,
  sortOrder: any,
  minPrice: any,
  maxPrice: any,
  category: any,
  search: any
) => {
  try {
    // Initialize filters object as an empty object
    const filters: Prisma.BookWhereInput = {};

    // Apply filters based on query parameters
    if (minPrice) {
      filters.price = {
        gte: parseFloat(minPrice),
      };
    }
    if (maxPrice) {
      filters.price = {
        ...filters.price,
        lte: parseFloat(maxPrice),
      };
    }
    if (category) {
      filters.categoryId = category;
    }
    if (search) {
      filters.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        {
          author: {
            contains: search,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        {
          genre: {
            contains: search,
            mode: 'insensitive', // Case-insensitive search
          },
        },
      ];
    }

    // Apply sorting
    const orderBy: Prisma.BookOrderByWithRelationInput = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    // Calculate skip and take for pagination
    const skip = (page - 1) * size;
    const take = size;

    // Fetch books based on filters, sorting, pagination
    const books = await prisma.book.findMany({
      where: filters,
      orderBy,
      skip,
      take,
    });

    // Count the total number of books without pagination
    const total = await prisma.book.count({ where: filters });

    return { books, total };
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

export const getBooksByCategoryId = async (
  categoryId: any,
  page: any,
  size: any
) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        categoryId,
      },
    });
    return books;
  } catch (error) {
    throw new Error('Error fetching books by category');
  }
};

export const getSingleBook = async (id: string) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
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

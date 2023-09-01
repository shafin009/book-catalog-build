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

export async function getAllBooks(
  page: number,
  size: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc' = 'asc',
  minPrice: number | undefined,
  maxPrice: number | undefined,
  categoryId: string | undefined,
  search: string | undefined
) {
  try {
    const skip = (page - 1) * size;
    const orderBy: Prisma.SortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    const where: Prisma.BookWhereInput = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }

    if (search !== undefined) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          genre: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    
    const totalBooks = await prisma.book.count({ where });

   
    const totalPage = Math.ceil(totalBooks / size);

    const books = await prisma.book.findMany({
      where,
      skip,
      take: size,
      orderBy: {
        [sortBy]: orderBy,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Books fetched successfully',
      meta: {
        page,
        size,
        total: totalBooks,
        totalPage,
      },
      data: books,
    };
  } catch (error) {
    // Handle errors as needed
  }
}

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

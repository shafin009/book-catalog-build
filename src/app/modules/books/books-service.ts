import { Book, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBook(bookData: Book): Promise<Book> {
  const book = await prisma.book.create({
    data: bookData,
  });
  return book;
}

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

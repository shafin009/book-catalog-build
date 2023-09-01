import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function createCategory(title: string): Promise<Category> {
  const category = await prisma.category.create({
    data: {
      title,
    },
  });
  return category;
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getSingleCategory(id: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
}

export async function updateCategory(
  id: string,
  title: string
): Promise<Category | null> {
  const category = await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
  return category;
}

export async function deleteCategory(id: string): Promise<Category | null> {
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });
  return category;
}

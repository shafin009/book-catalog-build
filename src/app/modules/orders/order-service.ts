/* eslint-disable no-useless-catch */
// order-service.ts
import { Order, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function createOrder(userId: string, orderedBooks: any[]) {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        orderedBooks: {
          create: orderedBooks.map(({ bookId, quantity }) => ({
            bookId,
            quantity,
          })),
        },
        status: 'pending',
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (user: any, payload: any) => {
  const { id, role } = user;
  if (role !== 'customer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only customer can order');
  }
  const { orderedBooks } = payload;
  const createdAt = new Date();

  const result = await prisma.order.create({
    data: {
      userId: id,
      orderedBooks,
      createdAt,
    },
  });
  return result;
};

const getAllOrder = async (user: any) => {
  const { role, id } = user;

  if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        user: true,
      },
    });

    return result;
  }
  if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    return result;
  }
};

const getOrderById = async (orderId: string, user: any) => {
  const { role, id } = user;

  if (role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: id,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
  if (role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
};

export const OrderService = {
  insertIntoDB,
  getAllOrder,
  getOrderById,
};

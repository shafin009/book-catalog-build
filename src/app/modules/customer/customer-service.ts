/* eslint-disable no-undef */
import { PrismaClient,User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();


export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getSingleUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  return user;
}

export async function updateUser(
  id: string,
  payload: Partial<User>
): Promise<User | null> {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  return user;
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  return user;
}

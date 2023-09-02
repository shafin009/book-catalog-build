/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth-interface';

export const insertIntoDB = async (payload: User) => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this email');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  if (!result) {
    throw new ApiError(404, 'Something Went wrong');
  }

  const { password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  //create access token & refresh token

  const accessToken = jwtHelpers.createToken(
    { email: user.email, role: user.role, id: user.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: user.email, role: user.role, id: user.id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
export const AuthService = {
  insertIntoDB,
  loginUser,
};

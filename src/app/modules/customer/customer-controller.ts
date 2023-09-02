import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './customer-service';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllUsers();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await getSingleUser(id);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User fetched successfully',
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await updateUser(id, payload);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User updated successfully',
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User deleted successfully',
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
}

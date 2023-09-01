/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import config from '../../../config';
import AdminModel from './admin-model';
import { adminService } from './admin-service';

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminUser = new AdminModel(req.body);
    await adminUser.save();

    const { password, ...AdminWithoutPassword } = adminUser.toObject();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Admin created successfully',
      data: AdminWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...loginData } = req.body;
    const result = await adminService.loginAdmin(loginData);

    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Admin logged in successfully',
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

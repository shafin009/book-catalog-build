/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import config from '../../../config';
import { authService } from './auth-service';

export const postAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...loginData } = req.body;

    const result = await authService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

export const PostRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    const result = await authService.refreshToken(refreshToken);

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

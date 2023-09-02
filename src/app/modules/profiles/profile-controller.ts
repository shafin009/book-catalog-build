/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile-service';

export const getProfileController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const result = await ProfileService.getProfile(user);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User's information retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
);

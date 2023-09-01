/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { getProfile, updateProfile } from './profile-service';

export async function getProfileController(req: Request, res: Response) {
  try {
    const userMobileNumber = req.user?.userPhoneNumber;

    const profile = await getProfile(userMobileNumber);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User's information retrieved successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export async function updateProfileController(req: Request, res: Response) {
  try {
    const userMobileNumber = req.user?.userPhoneNumber;
    const updateData = req.body;

    const profile = await updateProfile(userMobileNumber, updateData);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User's information updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

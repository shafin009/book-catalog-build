import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import AdminModel, { Admin } from './admin-model';

const createAdmin = async (adminData: Partial<Admin>) => {
  const admin = await AdminModel.create(adminData);
  return admin;
};

const loginAdmin = async (loginData: Partial<Admin>) => {
  const { phoneNumber, password } = loginData;

  const admin = await AdminModel.findOne({ phoneNumber }).select('+password');

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const isPasswordMatch = await bcrypt.compare(password || '', admin.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const { phoneNumber: adminPhoneNumber, role } = admin;

  const accessToken = jwtHelpers.createToken(
    { phoneNumber: adminPhoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { adminPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const adminService = {
  loginAdmin,
  createAdmin,
};

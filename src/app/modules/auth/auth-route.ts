import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AuthController } from './auth-controller';

const router = express.Router();

router.post(
  '/auth/signup',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  AuthController.insertIntoDB,
);
router.post(
  '/auth/signin',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  AuthController.loginUser,
);

export const authRoutes = router;

import express from 'express';
import { ENUM_ROLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import {
  getProfileController,
  updateProfileController,
} from './profile-controller';

const router = express.Router();

router.get(
  '/users/my-profile',
  auth(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  getProfileController
);
router.patch(
  '/users/my-profile',
  auth(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  updateProfileController
);

export default router;

export const profileRoutes = router;

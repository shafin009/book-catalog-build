import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import {
  deleteUserById,
  getSingleUserById,
  getUsers,
  updateUserById,
} from './customer-controller';

const router = express.Router();

router.get('/users', auth(ENUM_USER_ROLE.ADMIN), getUsers);
router.get('/users/:id', auth(ENUM_USER_ROLE.ADMIN), getSingleUserById);
router.patch('/users/:id', auth(ENUM_USER_ROLE.ADMIN), updateUserById);
router.delete('/users/:id', auth(ENUM_USER_ROLE.ADMIN), deleteUserById);

export const customerRoutes = router;

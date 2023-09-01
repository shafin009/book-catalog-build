// order-route.ts
import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersForUser,
  getUserProfile,
} from './order-controller';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/orders/create-order', auth(ENUM_USER_ROLE.CUSTOMER), createOrder);
router.get('/orders/', auth(ENUM_USER_ROLE.ADMIN), getAllOrders);
router.get(
  '/orders/user-orders',
  auth(ENUM_USER_ROLE.CUSTOMER),
  getOrdersForUser
);
router.get(
  '/orders/:orderId',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.CUSTOMER),
  getOrderById
);
router.get(
  '/profile',

  getUserProfile
);

export const orderRoutes = router;

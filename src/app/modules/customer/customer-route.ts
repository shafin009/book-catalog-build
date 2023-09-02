import express from 'express';
import {
  deleteUserById,
  getSingleUserById,
  getUsers,
  updateUserById,
} from './customer-controller';

const router = express.Router();




router.get('/users', getUsers);
router.get('/users/:id', getSingleUserById);
router.patch('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export const customerRoutes = router;

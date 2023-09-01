import express from 'express';
import {
  deleteUserById,
  getSingleUserById,
  getUsers,
  signUp,
  updateUserById,
} from './customer-controller';

const router = express.Router();

router.post('/signup', signUp);
router.get('/users', getUsers);
router.get('/users/:id', getSingleUserById);
router.patch('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export const customerRoutes = router;

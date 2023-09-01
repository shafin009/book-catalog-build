import express from 'express';
import {
  signUp,
  getUsers,
  getSingleUserById,
  updateUserById,
  deleteUserById,
} from './customer-controller';

const router = express.Router();

router.post('/signup', signUp);
router.get('/users', getUsers);
router.get('/users/:id', getSingleUserById);
router.patch('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export const customerRoutes = router;

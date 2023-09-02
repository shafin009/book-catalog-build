import express from 'express';
import { AuthController } from './auth-controller';

const router = express.Router();

router.post('/auth/signup', AuthController.insertIntoDB);
router.post('/auth/signin', AuthController.loginUser);

export const authRoutes = router;

import express from 'express';
import { postAuth,  PostRefreshToken } from './auth-controller';

const router = express.Router();

router.post('/auth/login', postAuth);
router.post('/auth/refresh-token', PostRefreshToken);

export const authRoutes = router;

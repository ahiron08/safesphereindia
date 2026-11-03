import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, me } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;

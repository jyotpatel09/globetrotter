import { Router } from 'express';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/trips', tripRoutes);
router.use('/auth', authRoutes);

export default router;

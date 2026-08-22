import { Router } from 'express';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import cityRoutes from './cityRoutes';
import discoveryActivityRoutes from './discoveryActivityRoutes';

const router = Router();

router.use('/trips', tripRoutes);
router.use('/auth', authRoutes);
router.use('/cities', cityRoutes);
router.use('/activities', discoveryActivityRoutes);

export default router;

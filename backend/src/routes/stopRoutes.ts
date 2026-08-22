import { Router } from 'express';
import { getStops, createStop, updateStop, deleteStop } from '../controllers/stopController';
import activityRoutes from './activityRoutes';

const router = Router({ mergeParams: true });

router.get('/', getStops);
router.post('/', createStop);
router.patch('/:stopId', updateStop);
router.delete('/:stopId', deleteStop);

// Mount nested activity routes
router.use('/:stopId/activities', activityRoutes);

export default router;

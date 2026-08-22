import { Router } from 'express';
import { getTrips, createTrip, getTripById, updateTrip, deleteTrip } from '../controllers/tripController';
import stopRoutes from './stopRoutes';

const router = Router();

router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.patch('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Mount nested stop routes
router.use('/:id/stops', stopRoutes);

export default router;

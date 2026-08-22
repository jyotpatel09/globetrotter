import { Router } from 'express';
import { getTrips, createTrip, getTripById, updateTrip, deleteTrip, getTripItinerary, getTripBudget, getTripTimeline } from '../controllers/tripController';
import stopRoutes from './stopRoutes';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Protect all trip and nested routes
router.use(requireAuth);

router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id/itinerary', getTripItinerary);
router.get('/:id/budget', getTripBudget);
router.get('/:id/timeline', getTripTimeline);
router.get('/:id', getTripById);
router.patch('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Mount nested stop routes
router.use('/:id/stops', stopRoutes);

export default router;

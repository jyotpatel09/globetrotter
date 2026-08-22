import { Router } from 'express';
import { getTripActivities, createTripActivity, updateTripActivity, deleteTripActivity } from '../controllers/activityController';

const router = Router({ mergeParams: true });

router.get('/', getTripActivities);
router.post('/', createTripActivity);
router.patch('/:tripActivityId', updateTripActivity);
router.delete('/:tripActivityId', deleteTripActivity);

export default router;

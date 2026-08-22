import { Router } from 'express';
import tripRoutes from './tripRoutes';
// stopRoutes and activityRoutes will be handled as nested routes under trips usually, 
// or separately depending on REST structure. Let's register them under trips.

const router = Router();

router.use('/trips', tripRoutes);

export default router;

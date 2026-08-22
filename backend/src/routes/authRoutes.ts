import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { sendSuccess } from '../utils/response';

const router = Router();

router.get('/me', requireAuth, (req: Request, res: Response) => {
  sendSuccess(res, req.user);
});

export default router;
